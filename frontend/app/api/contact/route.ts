import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Tiny, intentionally dumb contact endpoint.
// validate -> send email via SMTP -> return success.
// No auth, no database, no admin panel.

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !message.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } =
      process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      console.error("Contact form: SMTP env vars are not configured.");
      return NextResponse.json(
        { error: "Mail is not configured yet." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Hemandu.com" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New message from ${name} via hemandu.com`,
      text: message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }
}
