import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rateLimit";
import { validateContactPayload, sanitize } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Payload inválido." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const contact = {
    name: typeof payload.name === "string" ? payload.name : "",
    email: typeof payload.email === "string" ? payload.email : "",
    message: typeof payload.message === "string" ? payload.message : "",
    honeypot: typeof payload.company === "string" ? payload.company : "",
  };

  const { valid, errors } = validateContactPayload(contact);

  // Silently accept-and-drop honeypot hits so bots don't learn the field is checked.
  if (errors.honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!valid) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: integrar com serviço de e-mail/CRM real (ex: Resend, SendGrid).
  // Por ora, apenas confirma o recebimento sanitizado da mensagem.
  const clean = {
    name: sanitize(contact.name),
    email: sanitize(contact.email),
    message: sanitize(contact.message),
  };

  console.log("Novo contato recebido:", clean);

  return NextResponse.json({ ok: true });
}
