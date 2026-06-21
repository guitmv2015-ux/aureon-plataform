import { resend, EMAIL_FROM } from "@/lib/resend";
import { LeadConfirmationEmail } from "@/emails/lead-confirmation";
import { LeadNotificationEmail } from "@/emails/lead-notification";
import { PasswordResetEmail } from "@/emails/password-reset";
import { WelcomeEmail } from "@/emails/welcome";
import type { Lead } from "@prisma/client";

export async function sendLeadConfirmationEmail(lead: Pick<Lead, "name" | "email">) {
  return resend.emails.send({
    from: EMAIL_FROM,
    to: lead.email,
    subject: "Recebemos sua solicitação — Aureon Partners",
    react: LeadConfirmationEmail({ name: lead.name }),
  });
}

export async function sendLeadNotificationToSales(lead: Lead) {
  const salesEmail = process.env.SALES_NOTIFICATION_EMAIL;
  if (!salesEmail) return;

  return resend.emails.send({
    from: EMAIL_FROM,
    to: salesEmail,
    subject: `Novo lead: ${lead.name}`,
    react: LeadNotificationEmail({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      message: lead.message,
      source: lead.source,
    }),
  });
}

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  return resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: "Redefina sua senha — Aureon Partners",
    react: PasswordResetEmail({ resetUrl }),
  });
}

export async function sendWelcomeEmail(name: string, email: string) {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;
  return resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: "Bem-vindo à Aureon Partners",
    react: WelcomeEmail({ name, dashboardUrl }),
  });
}
