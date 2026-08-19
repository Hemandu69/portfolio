import express, { type Express } from "express";
import cors, { type CorsOptions } from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import contactRoutes from "./routes/contact.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";
import { sendSuccess } from "./utils/response.js";

export const createApp = (): Express => {
  const app = express();

  // Basic security headers
  app.use(helmet());

  // Trust proxy for rate limiting behind reverse proxies (Render, Vercel, Cloudflare, etc.)
  app.set("trust proxy", 1);

  // CORS configuration
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      const isAllowed = env.ALLOWED_ORIGINS.some((allowed) => {
        return origin === allowed || origin.endsWith(".hemandu.com");
      });

      if (isAllowed || env.isDevelopment) {
        callback(null, true);
      } else {
        callback(new Error(`CORS origin not allowed: ${origin}`));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // 24 hours preflight cache
  };

  app.use(cors(corsOptions));

  // Request body parsing with strict size limit
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));

  // Basic request logger for development/monitoring
  app.use((req, _res, next) => {
    if (!env.isProduction) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    }
    next();
  });

  // Health check endpoint
  app.get("/health", (_req, res) => {
    return sendSuccess(res, "Portfolio API is running.", {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
    });
  });

  // Contact routes
  app.use("/api/contact", contactRoutes);

  // 404 handler for unknown routes
  app.use(notFoundHandler);

  // Centralized error handler
  app.use(errorHandler);

  return app;
};
