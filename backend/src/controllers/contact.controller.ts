import type { Request, Response } from "express";
import { z } from "zod";
import { emailService } from "../services/email.service.js";
import { sendSuccess, sendError } from "../utils/response.js";

const VALID_SHORT_MESSAGES = new Set([
  "hi",
  "hey",
  "hello",
  "yo",
  "sup",
  "ok",
  "okay",
  "yes",
  "no",
  "thanks",
  "thx",
  "bye",
]);

const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must be less than 100 characters."),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email("Please provide a valid email address.")
    .max(255, "Email is too long."),
  message: z
    .string({ required_error: "Message is required." })
    .trim()
    .min(1, "Message is required.")
    .max(5000, "Message must be less than 5000 characters.")
    .refine(
      (val) => {
        const trimmed = val.trim();
        if (trimmed.length >= 5) return true;
        return VALID_SHORT_MESSAGES.has(trimmed.toLowerCase());
      },
      { message: "Message must be at least 5 characters unless it is a recognized short greeting." }
    ),
});

export const handleContactForm = async (req: Request, res: Response): Promise<Response> => {
  const parseResult = contactSchema.safeParse(req.body);

  if (!parseResult.success) {
    const errorMessages = parseResult.error.issues.map((issue) => issue.message);
    return sendError(res, "Validation failed.", errorMessages, 400);
  }

  const { name, email, message } = parseResult.data;

  try {
    await emailService.sendContactEmails({ name, email, message });
    console.log(`[Contact] Successfully processed inquiry from ${email} (${name})`);
    return sendSuccess(
      res,
      "Your message has been sent successfully. Check your inbox — I've sent you a little confirmation 🚀",
      undefined,
      200
    );
  } catch (error) {
    console.error("[Contact] Error processing contact inquiry:", error instanceof Error ? error.message : error);
    return sendError(
      res,
      "Failed to deliver message. Please try again or reach out directly via email.",
      undefined,
      500
    );
  }
};