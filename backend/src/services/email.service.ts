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

    // 2. Send Visitor Confirmation Email (non-blocking for overall form submission)
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
    const subject = "New message. The inbox has been disturbed.";

    const text = [
      "NEW MESSAGE",
      "Someone just dropped something into the inbox.",
      "",
      `NAME:      ${name}`,
      `EMAIL:     ${email}`,
      `RECEIVED:  ${new Date().toUTCString()}`,
      "",
      "MESSAGE:",
      "----------------------------------------",
      message,
      "----------------------------------------",
      "",
      "Probably worth reading.",
      "",
      "----------------------------------------",
      "HEMANDU",
      "hemandu.com",
      `Hit Reply to directly message ${name}.`,
    ].join("\n");

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Message</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #0c0d0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0c0d0e;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; margin: 0 auto; background-color: #141517; border: 1px solid #26282b; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #232528;">
              <div style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #a99cc2; background-color: rgba(169, 156, 194, 0.12); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(169, 156, 194, 0.25);">
                NEW MESSAGE
              </div>
              <h1 style="margin: 14px 0 6px 0; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">Someone just dropped something into the inbox.</h1>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding: 22px 32px; background-color: #18191c; border-bottom: 1px solid #232528;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 8px; font-size: 13px; color: #8e9299; width: 90px; vertical-align: top;">
                    <strong style="color: #ffffff; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">NAME</strong>
                  </td>
                  <td style="padding-bottom: 8px; font-size: 14px; color: #ededed;">
                    ${escapeHtml(name)}
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 8px; font-size: 13px; color: #8e9299; vertical-align: top;">
                    <strong style="color: #ffffff; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">EMAIL</strong>
                  </td>
                  <td style="padding-bottom: 8px; font-size: 14px;">
                    <a href="mailto:${escapeHtml(email)}" style="color: #a99cc2; text-decoration: none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #8e9299; vertical-align: top;">
                    <strong style="color: #8e9299; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;">RECEIVED</strong>
                  </td>
                  <td style="font-size: 12px; color: #8e9299;">
                    ${new Date().toUTCString()}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 28px 32px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #8e9299; margin-bottom: 10px;">MESSAGE</div>
              <div style="padding: 20px; background-color: #0c0d0e; border: 1px solid #26282b; border-radius: 8px; font-size: 15px; line-height: 1.65; color: #f2eeea; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${escapeHtml(message)}</div>

              <p style="margin: 20px 0 0 0; font-size: 13px; font-style: italic; color: #8e9299; line-height: 1.5;">
                Probably worth reading.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #101113; border-top: 1px solid #232528; text-align: center;">
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #f2eee8;">HEMANDU</div>
              <div style="margin-top: 4px; font-size: 12px; color: #8e9299;">
                <a href="https://hemandu.com" style="color: #a99cc2; text-decoration: none;">hemandu.com</a>
              </div>
              <div style="margin-top: 12px; font-size: 11px; color: #5f6368;">
                Hit <strong>Reply</strong> to respond directly to ${escapeHtml(name)}.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
      throw new Error(`Resend owner notification failed: ${error.message}`);
    }

    console.log(`[EmailService] Owner notification delivered (ID: ${data?.id})`);
  }

  private async sendVisitorConfirmation({ name, email }: { name: string; email: string }): Promise<void> {
    const subject = "Your message survived. Somehow.";

    const text = [
      "MESSAGE DELIVERED.",
      "",
      `Hey ${name},`,
      "",
      "Your message has successfully made its way through the contact form and into Hemandu's inbox.",
      "",
      "MISSION STATUS",
      "+ Message delivered",
      "+ Inbox successfully notified",
      "+ No carrier pigeons required",
      "",
      "WHAT HAPPENS NEXT?",
      "Hemandu will have a look. If your message deserves a reply, you'll hear back.",
      "",
      "Until then, your message is safely parked in the inbox.",
      "",
      "----------------------------------------",
      "HEMANDU",
      "hemandu.com",
    ].join("\n");

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Delivered</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #0c0d0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0c0d0e;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; margin: 0 auto; background-color: #141517; border: 1px solid #26282b; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #232528; text-align: center;">
              <div style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: #a99cc2; margin-bottom: 14px;"></div>
              <h1 style="margin: 0; font-size: 19px; font-weight: 700; color: #ffffff; letter-spacing: 0.08em; text-transform: uppercase;">MESSAGE DELIVERED.</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 28px 32px; font-size: 15px; line-height: 1.65; color: #d4d4d8;">
              <p style="margin: 0 0 16px 0; color: #f4f4f5; font-size: 16px;">Hey <strong style="color: #ffffff;">${escapeHtml(name)}</strong>,</p>
              
              <p style="margin: 0 0 24px 0; color: #a1a1aa;">
                Your message has successfully made its way through the contact form and into Hemandu's inbox.
              </p>

              <!-- Mission Status -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px; background-color: #0c0d0e; border: 1px solid #26282b; border-radius: 8px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #a99cc2; margin-bottom: 10px;">MISSION STATUS</div>
                    <div style="font-size: 14px; line-height: 1.8; color: #e4e4e7;">
                      <div style="color: #4ade80;">&#10003; <span style="color: #e4e4e7;">Message delivered</span></div>
                      <div style="color: #4ade80;">&#10003; <span style="color: #e4e4e7;">Inbox successfully notified</span></div>
                      <div style="color: #4ade80;">&#10003; <span style="color: #e4e4e7;">No carrier pigeons required</span></div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- What Happens Next -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px; background-color: #18191c; border-left: 3px solid #a99cc2; border-radius: 4px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #f4f4f5; margin-bottom: 6px;">WHAT HAPPENS NEXT?</div>
                    <div style="font-size: 14px; color: #a1a1aa; line-height: 1.5;">
                      Hemandu will have a look. If your message deserves a reply, you'll hear back.
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 14px; color: #a1a1aa;">
                Until then, your message is safely parked in the inbox.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #101113; border-top: 1px solid #232528; text-align: center;">
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #f2eee8;">HEMANDU</div>
              <div style="margin-top: 4px; font-size: 12px; color: #8e9299;">
                <a href="https://hemandu.com" style="color: #a99cc2; text-decoration: none;">hemandu.com</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const { data, error } = await this.resend.emails.send({
      from: env.FROM_EMAIL,
      to: [email],
      subject,
      text,
      html,
    });

    if (error) {
      throw new Error(`Resend visitor confirmation failed: ${error.message}`);
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