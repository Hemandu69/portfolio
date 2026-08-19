import dotenv from "dotenv";
import { z } from "zod";

// Load .env file
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(5000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  FRONTEND_URL: z
    .string()
    .default("https://www.hemandu.com,https://hemandu.com,http://localhost:3000"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  CONTACT_EMAIL: z.string().email("CONTACT_EMAIL must be a valid destination email address"),
  FROM_EMAIL: z.string().min(1, "FROM_EMAIL is required (e.g., Hemandu <hello@hemandu.com>)"),
});

const validateEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("? Environment configuration validation failed:");
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    });
    console.error("\nPlease check your .env file or deployment environment settings.");
    process.exit(1);
  }

  const raw = result.data;

  // Split comma-separated origins and trim whitespace
  const allowedOrigins = raw.FRONTEND_URL.split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

  return {
    ...raw,
    ALLOWED_ORIGINS: allowedOrigins,
    isProduction: raw.NODE_ENV === "production",
    isDevelopment: raw.NODE_ENV === "development",
  };
};

export const env = validateEnv();
export type Env = typeof env;
