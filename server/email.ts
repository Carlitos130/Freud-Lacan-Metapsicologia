import { Resend } from 'resend';

// Sin RESEND_API_KEY configurada, el enlace se imprime en el log del servidor
// en vez de enviarse — permite probar el flujo completo antes de dar de alta
// el servicio de email.
export async function sendMagicLinkEmail(email: string, link: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn(`[auth] RESEND_API_KEY / EMAIL_FROM no configurados. Enlace para ${email}: ${link}`);
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: email,
    subject: 'Tu enlace de acceso a THÉORIE',
    html: `<p>Hacé clic para entrar a THÉORIE. El enlace vence en 20 minutos.</p><p><a href="${link}">${link}</a></p><p>Si no lo pediste vos, ignorá este mensaje.</p>`,
  });
}
