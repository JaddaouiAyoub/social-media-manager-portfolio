import "server-only";

/**
 * Email delivery configuration (server-side only).
 *
 * Messages are delivered through the Resend HTTP API (https://resend.com).
 * All three variables must be set; otherwise the form reports clearly that
 * online messaging is not available instead of pretending to send.
 */
export function getContactConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? "";
  const from = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";
  return { apiKey, to, from, configured: Boolean(apiKey && to && from) };
}

export function isContactConfigured(): boolean {
  return getContactConfig().configured;
}
