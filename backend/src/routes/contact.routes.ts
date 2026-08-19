import { Router } from "express";
import { handleContactForm } from "../controllers/contact.controller.js";
import { contactRateLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

// POST /api/contact - rate limited and validated
router.post("/", contactRateLimiter, handleContactForm);

export default router;
