import { getContactConfig } from "@/lib/contact-config";
import {
  MIN_FILL_TIME_MS,
  normalizeContactPayload,
  validateContact,
  type ContactApiResponse,
} from "@/lib/contact-validation";

/* ------------------------------------------------------------------ */
/*  Simple in-memory rate limit (per server instance).                */
/*  For multi-instance deployments, replace with a shared store.      */
/* ------------------------------------------------------------------ */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function json(body: ContactApiResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
    if (typeof body !== "object" || body === null) throw new Error("Invalid body");
  } catch {
    return json({ ok: false, code: "bad_request", message: "The request could not be read." }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Bots get a
  // neutral response and nothing is sent.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return json(
      { ok: false, code: "too_fast", message: "That was quick! Please take a moment and try again." },
      400,
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return json(
      { ok: false, code: "rate_limited", message: "Too many messages in a short time. Please try again later." },
      429,
    );
  }

  const payload = normalizeContactPayload(body);
  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, code: "validation", message: "Please check the highlighted fields.", errors }, 422);
  }

  const config = getContactConfig();
  if (!config.configured) {
    return json(
      {
        ok: false,
        code: "not_configured",
        message:
          "Online messaging is not set up yet, so your message was not sent. Please use the direct contact links instead.",
      },
      503,
    );
  }

  const subject = payload.subject || `New message from ${payload.name}`;
  const html = `
    <h2>New portfolio message</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject || "—")}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: payload.email,
        subject: `[Portfolio] ${subject}`,
        html,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject || "-"}\n\n${payload.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[contact] Email provider error", response.status, await response.text().catch(() => ""));
      return json(
        { ok: false, code: "send_failed", message: "Your message could not be sent right now. Please try again later." },
        502,
      );
    }
  } catch (error) {
    console.error("[contact] Email delivery failed", error);
    return json(
      { ok: false, code: "send_failed", message: "Your message could not be sent right now. Please try again later." },
      502,
    );
  }

  return json({ ok: true }, 200);
}
