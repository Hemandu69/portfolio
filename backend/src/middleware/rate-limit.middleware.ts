import rateLimit from "express-rate-limit";
import { sendError } from "../utils/response.js";

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact submissions per 15-minute window
  standardHeaders: true, // Return standard RateLimit headers in response
  legacyHeaders: false, // Disable X-RateLimit-* headers
  handler: (_req, res) => {
    return sendError(
      res,
      "Too many contact submissions from this IP address. Please wait a few minutes before trying again.",
      undefined,
      429
    );
  },
});
