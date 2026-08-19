import { Resend } from "resend";
import { env } from "../config/env.js";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

class EmailService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(env.RESEND_API_KEY);
  }

  public async sendContactEmails({ name, email, message }: ContactMessage): Promise<void> {
    // 1. Send Owner Notification Email
    await this.sendOwnerNotification({ name, email, message });

    // 2. Send Visitor Confirmation Email (non-blocking for overall success)
    try {
      await this.sendVisitorConfirmation({ name, email });
    } catch (confError) {
      console.warn(
        "[EmailService] Failed to deliver visitor confirmation email:",
        confError instanceof Error ? confError.message : confError
      );
    }
  }

  private async sendOwnerNotification({ name, email, message }: ContactMessage): Promise<void> {
    const subject = `Portfolio message from ${name}`;

    const text = [
      `New message from portfolio visitor:`,
      ``,
      `From:    ${name}`,
      `Email:   ${email}`,
      `Date:    ${new Date().toUTCString()}`,
      ``,
      `Message:`,
      `----------------------------------------`,
      message,
      `----------------------------------------`,
    ].join("\n");

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a; background-color: #fcfcfc; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="margin-top: 0; font-size: 20px; color: #111; border-bottom: 1px solid #eaeaea; padding-bottom: 12px;">New Portfolio Message</h2>
        <div style="margin: 16px 0; line-height: 1.6;">
          <p style="margin: 6px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #6366f1;">${escapeHtml(email)}</a></p>
          <p style="margin: 6px 0; color: #666; font-size: 13px;"><strong>Received:</strong> ${new Date().toUTCString()}</p>
        </div>
        <div style="margin-top: 20px; padding: 16px; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 6px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #222;">
${escapeHtml(message)}
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #888; border-top: 1px solid #eaeaea; padding-top: 12px;">
          Sent from your portfolio contact form at <a href="https://www.hemandu.com" style="color: #888;">hemandu.com</a>. Reply directly to this email to respond to ${escapeHtml(name)}.
        </p>
      </div>
    `;

    const { data, error } = await this.resend.emails.send({
      from: env.FROM_EMAIL,
      to: [env.CONTACT_EMAIL],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      throw new Error(`Resend owner dispatch error: ${error.message}`);
    }

    console.log(`[EmailService] Owner notification delivered (ID: ${data?.id})`);
  }

  private async sendVisitorConfirmation({ name, email }: { name: string; email: string }): Promise<void> {
    const subject = `Your message has successfully escaped into Hemandu's inbox ??`;

    const text = [
      `Hey ${name},`,
      ``,
      `Your message has successfully escaped into Hemandu's inbox.`,
      ``,
      `It survived the contact form, crossed the internet, dodged several questionable Wi-Fi networks, and has officially arrived. ??`,
      ``,
      `Hemandu has been notified.`,
      ``,
      `What happens next?`,
      `Probably a reply. Eventually.`,
      `Unless he's debugging something... in that case, send moral support. ??`,
      ``,
      `Your message is safe and sound, so there is absolutely no need to submit it 17 more times. ??`,
      ``,
      `Mission accomplished.`,
      ``,
      `— Hemandu's unnecessarily dramatic portfolio`,
      `https://www.hemandu.com`,
    ].join("\n");

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; color: #1f2937; background-color: #0b0b0d; border: 1px solid #27272a; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 28px;">??</span>
          <h2 style="margin: 8px 0 0 0; font-size: 20px; color: #f4f4f5; font-weight: 600; letter-spacing: -0.02em;">Message Escaped Successfully!</h2>
        </div>

        <div style="font-size: 15px; line-height: 1.7; color: #d4d4d8;">
          <p style="margin-top: 0;">Hey <strong style="color: #fafafa;">${escapeHtml(name)}</strong>,</p>
          
          <p>
            Your message has successfully escaped into Hemandu's inbox. It survived the contact form, crossed the internet, dodged several questionable Wi-Fi networks, and has officially arrived.
          </p>

          <div style="margin: 20px 0; padding: 16px; background-color: #18181b; border-left: 3px solid #818cf8; border-radius: 4px; color: #e4e4e7;">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: #f4f4f5;">What happens next?</p>
            <p style="margin: 0 0 6px 0; font-size: 14px; color: #a1a1aa;">• Hemandu has been notified on his primary radar.</p>
            <p style="margin: 0 0 6px 0; font-size: 14px; color: #a1a1aa;">• Probably a reply. Eventually.</p>
            <p style="margin: 0; font-size: 14px; color: #a1a1aa;">• Unless he's debugging something... in that case, send moral support. ??</p>
          </div>

          <p style="font-size: 14px; color: #a1a1aa;">
            Your message is safe and sound, so there is absolutely no need to hit submit 17 more times. ??
          </p>
        </div>

        <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #27272a; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #71717a;">
            — <a href="https://www.hemandu.com" style="color: #a1a1aa; text-decoration: none;">Hemandu's unnecessarily dramatic portfolio</a>
          </p>
        </div>
      </div>
    `;

    const { data, error } = await this.resend.emails.send({
      from: env.FROM_EMAIL,
      to: [email],
      subject,
      text,
      html,
    });

    if (error) {
      throw new Error(`Resend visitor confirmation error: ${error.message}`);
    }

    console.log(`[EmailService] Visitor confirmation delivered to ${email} (ID: ${data?.id})`);
  }
}

const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const emailService = new EmailService();
