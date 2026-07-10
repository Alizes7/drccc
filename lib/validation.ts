export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactPayload, string>>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripTags(input: string): string {
  return input.replace(/<[^>]*>?/gm, "");
}

export function sanitize(input: string): string {
  return stripTags(input).trim().slice(0, 2000);
}

export function validateContactPayload(payload: ContactPayload): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const message = sanitize(payload.message);

  if (name.length < 2) errors.name = "Informe seu nome.";
  if (!EMAIL_RE.test(email)) errors.email = "Informe um e-mail válido.";
  if (message.length < 10) errors.message = "Mensagem muito curta.";

  // Honeypot: if filled, it was a bot. Not surfaced as a user-facing error.
  if (payload.honeypot && payload.honeypot.length > 0) {
    errors.honeypot = "bot";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
