import type { Response } from "express";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200
): Response => {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  };
  return res.status(statusCode).json(payload);
};

export const sendError = (
  res: Response,
  message: string,
  errors?: string[],
  statusCode = 400
): Response => {
  const payload: ApiResponse = {
    success: false,
    message,
    ...(errors && errors.length > 0 && { errors }),
  };
  return res.status(statusCode).json(payload);
};
