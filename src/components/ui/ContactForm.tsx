"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";
import {
  contactLimits,
  normalizeContactPayload,
  validateContact,
  type ContactApiResponse,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact-validation";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success" }
  | { state: "error"; message: string };

type ContactFormProps = {
  /** Whether email delivery is configured on the server. */
  configured: boolean;
  /** Shows owner-facing setup instructions (development only). */
  showSetupHint: boolean;
};

const fields: {
  name: ContactField;
  label: string;
  type: "text" | "email" | "textarea";
  autoComplete?: string;
  optional?: boolean;
  placeholder: string;
}[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@example.com" },
  { name: "subject", label: "Subject", type: "text", optional: true, placeholder: "What is it about?" },
  { name: "message", label: "Message", type: "textarea", placeholder: "Tell me about your brand and your goals…" },
];

export function ContactForm({ configured, showSetupHint }: ContactFormProps) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [startedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = normalizeContactPayload(Object.fromEntries(data) as Record<ContactField, string>);

    const clientErrors = validateContact(payload);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      const first = Object.keys(clientErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setStatus({ state: "idle" });
      return;
    }

    setStatus({ state: "loading" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website: data.get("website") ?? "", startedAt }),
      });
      const result = (await response.json()) as ContactApiResponse;

      if (result.ok) {
        setStatus({ state: "success" });
        form.reset();
        return;
      }
      if (result.errors) setErrors(result.errors);
      setStatus({ state: "error", message: result.message });
    } catch {
      setStatus({ state: "error", message: "Network error: your message was not sent. Please try again." });
    }
  }

  if (status.state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className="flex min-h-[28rem] flex-col items-center justify-center gap-4 text-center"
      >
        <span className="grid size-16 place-items-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h3 className="font-display text-2xl font-semibold">Message sent!</h3>
        <p className="max-w-sm text-muted">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
        <Button variant="secondary" onClick={() => setStatus({ state: "idle" })}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  const loading = status.state === "loading";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby={!configured ? "contact-setup-notice" : undefined}>
      {!configured && (
        <div
          id="contact-setup-notice"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary-soft p-4 text-sm leading-relaxed"
        >
          <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p>
              Online messaging is not active yet: messages sent from this form cannot be delivered. Please use the
              direct contact options for now.
            </p>
            {showSetupHint && (
              <p className="mt-2 text-muted">
                <strong className="text-fg">Owner setup (dev only):</strong> set <code>RESEND_API_KEY</code>,{" "}
                <code>CONTACT_TO_EMAIL</code> and <code>CONTACT_FROM_EMAIL</code> in <code>.env.local</code>, then
                restart / rebuild. See README › Contact form.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const error = errors[field.name];
          const id = `contact-${field.name}`;
          const describedBy = error ? `${id}-error` : undefined;
          const common = {
            id,
            name: field.name,
            placeholder: field.placeholder,
            autoComplete: field.autoComplete,
            required: !field.optional,
            "aria-required": !field.optional,
            "aria-invalid": Boolean(error),
            "aria-describedby": describedBy,
            disabled: loading,
            maxLength: contactLimits[field.name].max,
            onChange: () => error && setErrors((prev) => ({ ...prev, [field.name]: undefined })),
            className: cn(
              "w-full rounded-2xl border bg-bg/60 px-4 py-3.5 text-[0.95rem] text-fg placeholder:text-subtle transition-[border-color,box-shadow] duration-300 outline-none focus:border-primary focus:shadow-[0_0_0_4px_var(--primary-soft)] disabled:opacity-60",
              error ? "border-danger" : "border-line-strong",
            ),
          };
          return (
            <div key={field.name} className={cn("flex flex-col gap-2", (field.type === "textarea" || field.name === "subject") && "sm:col-span-2")}>
              <label htmlFor={id} className="text-sm font-medium">
                {field.label}
                {field.optional ? <span className="ml-1 font-normal text-subtle">(optional)</span> : <span className="ml-0.5 text-primary" aria-hidden="true">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea {...common} rows={6} className={cn(common.className, "resize-y")} />
              ) : (
                <input {...common} type={field.type} inputMode={field.type === "email" ? "email" : undefined} />
              )}
              <AnimatePresence initial={false}>
                {error && (
                  <motion.p
                    id={`${id}-error`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1.5 text-sm text-danger"
                  >
                    <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Honeypot field: hidden from people and assistive tech, filled by bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" className="mt-5 min-h-0">
        {status.state === "error" && (
          <p role="alert" className="flex items-start gap-2 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-fg">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
            {status.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-subtle">Fields marked * are required. Your details are only used to reply.</p>
        <Button type="submit" size="lg" disabled={loading} aria-busy={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
