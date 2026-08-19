# Hemandu Portfolio Backend

A lightweight, secure, and production-ready contact & inquiry backend service for [hemandu.com](https://www.hemandu.com) powered by Express, TypeScript, and the official **Resend HTTP Email API**.

## ?? Features

- **Resend HTTP API**: Zero SMTP port dependencies — fully compatible with cloud hosts like Render that block outbound SMTP ports (25, 465, 587).
- **Dual Email Dispatch**:
  1. **Owner Notification**: Instantly delivers the visitor message with direct `Reply-To` support.
  2. **Automated Visitor Confirmation**: Sends a humorous, developer-themed confirmation to the visitor.
- **TypeScript Strict Mode**: Fully typed request/response lifecycles.
- **Authoritative Zod Validation**: Server-side validation of inputs and environment variables on startup.
- **Spam & Abuse Protection**: IP-based rate limiting via `express-rate-limit` (5 requests / 15 mins).
- **Security Headers & CORS**: Hardened with `helmet` and domain-restricted CORS (`https://www.hemandu.com`, `https://hemandu.com`).
- **Zero Database Overhead**: Stateless and intentionally lightweight.

---

## ?? Project Structure

```
backend/
+-- src/
¦   +-- config/
¦   ¦   +-- env.ts                 # Environment variable schema & Zod validation
¦   +-- controllers/
¦   ¦   +-- contact.controller.ts  # Zod validation & dual dispatch handler
¦   +-- middleware/
¦   ¦   +-- error.middleware.ts    # 404 and unhandled error formatters
¦   ¦   +-- rate-limit.middleware.ts # IP rate limiter
¦   +-- routes/
¦   ¦   +-- contact.routes.ts      # Contact routing definition
¦   +-- services/
¦   ¦   +-- email.service.ts       # Resend SDK client & dual email templates
¦   +-- utils/
¦   ¦   +-- response.ts            # Standardized API response formatters
¦   +-- app.ts                     # Express app setup, CORS, Helmet
¦   +-- server.ts                  # Server entrypoint with graceful shutdown
+-- .env.example
+-- package.json
+-- tsconfig.json
+-- README.md
```

---

## ?? Environment Variables

Create a `.env` file in the `backend/` directory based on `.env.example`:

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | No | Port the server listens on (default: `5000`) | `5000` |
| `NODE_ENV` | No | Environment mode (`development` / `production`) | `production` |
| `FRONTEND_URL` | Yes | Allowed CORS origin(s), comma-separated | `https://www.hemandu.com,https://hemandu.com,http://localhost:3000` |
| `RESEND_API_KEY` | Yes | API Key from Resend Dashboard | `re_123456789...` |
| `CONTACT_EMAIL` | Yes | Destination inbox where inquiries are delivered | `hemen@example.com` |
| `FROM_EMAIL` | Yes | Verified sender address in Resend | `"Hemandu Portfolio" <hello@hemandu.com>` |

---

## ??? Local Development

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your Resend API Key, Contact Email, and From Email
```

### 3. Run development server (with hot reload)
```bash
npm run dev
```

### 4. Build and run in production mode
```bash
npm run build
npm start
```

---

## ?? API Endpoints

### 1. Health Check
Checks if the backend service is alive and healthy.

- **Method**: `GET`
- **Path**: `/health`
- **Response `200 OK`**:
```json
{
  "success": true,
  "message": "Portfolio API is running.",
  "data": {
    "timestamp": "2026-08-19T14:40:00.000Z",
    "uptime": 120.45,
    "environment": "production"
  }
}
```

---

### 2. Submit Contact Form
Validates the submission and triggers both the owner notification and visitor confirmation.

- **Method**: `POST`
- **Path**: `/api/contact`
- **Headers**: `Content-Type: application/json`

#### Request Body
```json
{
  "name": "Alex Mercer",
  "email": "alex@example.com",
  "message": "Hey Hemandu, loved your portfolio and would like to collaborate!"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Your message has been sent successfully. Check your inbox — I've sent you a little confirmation ??"
}
```

#### Validation Error (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "Please provide a valid email address.",
    "Message must be at least 3 characters."
  ]
}
```

#### Rate Limit Exceeded (`429 Too Many Requests`)
```json
{
  "success": false,
  "message": "Too many contact submissions from this IP address. Please wait a few minutes before trying again."
}
```

---

## ?? Deploying to Render

Render Free Web Services block outbound SMTP ports (25/465/587). Because this backend uses the **Resend HTTPS REST API**, it works natively on Render without port restrictions:

1. Create a **New Web Service** connected to your repository on Render.
2. Set **Root Directory** to `backend`.
3. Set **Build Command**: `npm install && npm run build`
4. Set **Start Command**: `npm start`
5. In **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://www.hemandu.com,https://hemandu.com`
   - `RESEND_API_KEY`: `re_your_api_key`
   - `CONTACT_EMAIL`: `your-personal-email@gmail.com`
   - `FROM_EMAIL`: `"Hemandu Portfolio" <hello@hemandu.com>`

### Connecting the Vercel Frontend:
In your Vercel project settings for the frontend:
1. Go to **Settings** ? **Environment Variables**.
2. Add:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-service.onrender.com`
3. Trigger a redeploy on Vercel.
