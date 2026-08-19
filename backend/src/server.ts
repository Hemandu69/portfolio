import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

const server = app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`
?? Hemandu Portfolio Backend is running!
---------------------------------------------
?? Environment: ${env.NODE_ENV}
?? Port:        ${env.PORT}
?? Healthcheck: http://localhost:${env.PORT}/health
??  Contact API: http://localhost:${env.PORT}/api/contact
?? CORS:        ${env.ALLOWED_ORIGINS.join(", ")}
---------------------------------------------
  `);
});

// Graceful shutdown handling
const shutdown = (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });

  // Force close after 10 seconds if hanging
  setTimeout(() => {
    console.error("Forcefully shutting down server after timeout.");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
