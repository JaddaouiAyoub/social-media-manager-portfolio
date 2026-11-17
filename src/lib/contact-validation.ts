/**
 * Contact form validation shared by the client form and the API route,
 * so both sides apply exactly the same rules.
 */

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactPayload = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactLimits = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  subject: { max: 120 },
  message: { min: 20, max: 4000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeContactPayload(input: Partial<Record<ContactField, unknown>>): ContactPayload {
  const read = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  return {
    name: read(input.name),
    email: read(input.email),
    subject: read(input.subject),
    message: read(input.message),
  };
}

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};

  if (payload.name.length < contactLimits.name.min) {
    errors.name = "Please enter your name.";
  } else if (payload.name.length > contactLimits.name.max) {
    errors.name = `Please keep your name under ${contactLimits.name.max} characters.`;
  }

  if (!payload.email) {
    errors.email = "Please enter your email address.";
  } else if (payload.email.length > contactLimits.email.max || !EMAIL_PATTERN.test(payload.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (payload.subject.length > contactLimits.subject.max) {
    errors.subject = `Please keep the subject under ${contactLimits.subject.max} characters.`;
  }

  if (payload.message.length < contactLimits.message.min) {
    errors.message = `Please write at least ${contactLimits.message.min} characters.`;
  } else if (payload.message.length > contactLimits.message.max) {
    errors.message = `Please keep your message under ${contactLimits.message.max} characters.`;
  }

  return errors;
}

/** Minimum time (ms) between rendering the form and submitting it — bots are faster. */
export const MIN_FILL_TIME_MS = 3000;

export type ContactApiResponse =
  | { ok: true }
  | {
      ok: false;
      code: "validation" | "not_configured" | "rate_limited" | "too_fast" | "send_failed" | "bad_request";
      message: string;
      errors?: ContactErrors;
    };
