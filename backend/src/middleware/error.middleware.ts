import type { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response.js";
import { env } from "../config/env.js";

export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, undefined, 404);
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  // Log error message internally for debugging
  console.error("Unhandled error encountered:", err.message);

  const message = env.isProduction
    ? "Something went wrong on the server. Please try again later."
    : err.message || "Internal server error";

  sendError(res, message, undefined, 500);
};
