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
    const subject = `Someone just escaped the contact form ??`;

    const text = [
      `Well, someone found the contact button.`,
      `Looks like the internet has delivered another message to your doorstep.`,
      ``,
      `NAME:    ${name}`,
      `EMAIL:   ${email}`,
      `DATE:    ${new Date().toUTCString()}`,
      ``,
      `MESSAGE:`,
      `----------------------------------------`,
      message,
      `----------------------------------------`,
      ``,
      `Someone took the time to write this instead of simply thinking about writing it. Respect.`,
      ``,
      `Reply directly to this email to respond to ${name}.`,
    ].join("\n");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Message</title>
        </head>
        <body style="margin: 0; padding: 32px 16px; background-color: #0c0d0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed;">
          <div style="max-width: 580px; margin: 0 auto; background-color: #141517; border: 1px solid #26282b; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #232528;">
              <span style="display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #a99cc2; background-color: rgba(169, 156, 194, 0.12); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(169, 156, 194, 0.25);">New Inquiry</span>
              <h1 style="margin: 14px 0 6px 0; font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">Well, someone found the contact button.</h1>
              <p style="margin: 0; font-size: 14px; color: #8e9299; line-height: 1.5;">Looks like the internet has delivered another message to your doorstep.</p>
            </div>

            <!-- Details -->
            <div style="padding: 24px 32px; background-color: #18191c; border-bottom: 1px solid #232528;">
              <div style="display: grid; grid-gap: 12px;">
                <p style="margin: 0; font-size: 13px; color: #8e9299;">
                  <strong style="color: #ffffff; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Name:</strong>&nbsp;
                  <span style="color: #ededed; font-size: 14px;">${escapeHtml(name)}</span>
                </p>
                <p style="margin: 0; font-size: 13px; color: #8e9299;">
                  <strong style="color: #ffffff; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Email:</strong>&nbsp;
                  <a href="mailto:${escapeHtml(email)}" style="color: #a99cc2; text-decoration: none; font-size: 14px;">${escapeHtml(email)}</a>
                </p>
                <p style="margin: 0; font-size: 12px; color: #696c73;">
                  <strong style="color: #8e9299; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Received:</strong>&nbsp;
                  ${new Date().toUTCString()}
                </p>
              </div>
            </div>

            <!-- Message Body -->
            <div style="padding: 28px 32px;">
              <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #8e9299; margin-bottom: 10px;">Message</span>
              <div style="padding: 20px; background-color: #0c0d0e; border: 1px solid #26282b; border-radius: 8px; font-size: 15px; line-height: 1.65; color: #f2eeea; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${escapeHtml(message)}</div>

              <p style="margin: 20px 0 0 0; font-size: 13px; font-style: italic; color: #8e9299; line-height: 1.5;">
                Someone took the time to write this instead of simply thinking about writing it. Respect.
              </p>
            </div>

            <!-- Footer -->
            <div style="padding: 16px 32px; background-color: #101113; border-top: 1px solid #232528; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #696c73;">
                Hit <strong>Reply</strong> to directly message <span style="color: #a99cc2;">${escapeHtml(name)}</span>.
              </p>
            </div>
          </div>
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
    const subject = `Your message has landed ??`;

    const text = [
      `Hey ${name},`,
      ``,
      `Your message has officially made its way through the contact form and into Hemandu's inbox.`,
      ``,
      `Mission Status:`,
      `? Message delivered`,
      `? Inbox successfully notified`,
      `? No carrier pigeons required`,
      ``,
      `What happens next?`,
      `Hemandu will have a look and, if your message demands a reply, you'll hear back.`,
      ``,
      `Until then, your message is safely parked in the inbox.`,
      `Thanks for stopping by.`,
      ``,
      `— Hemandu's portfolio`,
      `https://www.hemandu.com`,
    ].join("\n");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message Delivered</title>
        </head>
        <body style="margin: 0; padding: 32px 16px; background-color: #0c0d0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed;">
          <div style="max-width: 580px; margin: 0 auto; background-color: #141517; border: 1px solid #26282b; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #232528; text-align: center;">
              <span style="font-size: 32px; display: block; margin-bottom: 12px;">??</span>
              <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.02em;">Message successfully delivered.</h1>
            </div>

            <!-- Content -->
            <div style="padding: 28px 32px; font-size: 15px; line-height: 1.65; color: #d4d4d8;">
              <p style="margin: 0 0 16px 0; color: #f4f4f5; font-size: 16px;">Hey <strong style="color: #ffffff;">${escapeHtml(name)}</strong>,</p>
              
              <p style="margin: 0 0 20px 0; color: #a1a1aa;">
                Your message has officially made its way through the contact form and into Hemandu's inbox.
              </p>

              <!-- Mission Status -->
              <div style="margin: 20px 0; padding: 18px 20px; background-color: #0c0d0e; border: 1px solid #26282b; border-radius: 8px;">
                <span style="display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #a99cc2; margin-bottom: 10px;">Mission Status</span>
                <div style="font-size: 14px; line-height: 1.8; color: #e4e4e7;">
                  <div style="color: #4ade80;">? <span style="color: #e4e4e7;">Message delivered</span></div>
                  <div style="color: #4ade80;">? <span style="color: #e4e4e7;">Inbox successfully notified</span></div>
                  <div style="color: #4ade80;">? <span style="color: #e4e4e7;">No carrier pigeons required</span></div>
                </div>
              </div>

              <!-- Next Steps -->
              <div style="margin: 20px 0; padding: 18px 20px; background-color: #18191c; border-left: 3px solid #a99cc2; border-radius: 4px;">
                <p style="margin: 0 0 6px 0; font-weight: 600; font-size: 14px; color: #f4f4f5;">What happens next?</p>
                <p style="margin: 0; font-size: 14px; color: #a1a1aa; line-height: 1.5;">
                  Hemandu will have a look and, if your message demands a reply, you'll hear back.
                </p>
              </div>

              <p style="margin: 24px 0 0 0; font-size: 14px; color: #a1a1aa;">
                Until then, your message is safely parked in the inbox. Thanks for stopping by.
              </p>
            </div>

            <!-- Footer -->
            <div style="padding: 20px 32px; background-color: #101113; border-top: 1px solid #232528; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #71717a;">
                — <a href="https://www.hemandu.com" style="color: #a99cc2; text-decoration: none; font-weight: 500;">Hemandu's portfolio</a>
              </p>
            </div>
          </div>
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
