# Backend Changes Summary

This document summarizes the key backend features and infrastructure that were added.

## 1. Testing Setup (Option A)

- **Test runner**
  - Added `"test": "node --test"` script in `package.json`.
  - Uses Node's built-in test runner.
- **Dev dependency**
  - Added `supertest` for HTTP integration testing.
- **New tests** (in `backend/tests/`)
  - `app.test.js`
    - Tests `GET /api/health` returns status `ok` and a non-empty `features` list.
  - `appointmentService.test.js`
    - Verifies `bookAppointment` creates a confirmed appointment for valid data.
    - Verifies booking with an invalid provider throws `"Healthcare provider not found"`.
  - `insuranceService.test.js`
    - Verifies `checkCoverage` returns coverage details for a valid policy and treatment.
    - Verifies `processClaim` creates a claim and returns an expected reimbursement.

## 2. API Key Authentication (Option B)

- **Middleware**: `src/middleware/auth.js`
  - Expects a server-side `API_KEY` in environment variables.
  - Validates client header: `x-api-key: <your-api-key>`.
  - Returns `401 Unauthorized` if header is missing or invalid.
  - Returns `500` if `API_KEY` is not configured on the server.

- **Route protection (in `src/app.js`)**
  - **Public routes** (no API key required):
    - `GET /api/health`
    - Chat: `POST /api/chat`
    - Symptoms: `/api/symptoms/*`
    - Medical DB: `/api/medical-db/*`
    - Auth: `/api/auth/*`
  - **Protected routes** (API key required):
    - `/api/telemedicine/*`
    - `/api/appointments/*`
    - `/api/records/*`
    - `/api/insurance/*`

## 3. MongoDB Integration & User Model (Option C - Part 1)

- **Dependencies added** in `backend/package.json`:
  - `mongoose` – MongoDB ODM.
  - `bcrypt` – password hashing.
  - `jsonwebtoken` – JWT-based authentication.

- **Database connection**: `src/config/db.js`
  - Connects to `process.env.MONGODB_URI` or defaults to:
    - `mongodb://127.0.0.1:27017/health-chatbot`
  - On successful connection, logs `"MongoDB connected"`.
  - On failure, throws an error (server start will be aborted).

- **App startup change** (in `src/app.js`)
  - On non-test environments, the server now:
    1. Calls `connectDB()`.
    2. Starts `app.listen(...)` **only after** MongoDB connection succeeds.
  - On DB connection error, logs the error and exits the process.

- **User model**: `src/models/User.js`
  - Fields:
    - `name` (String, required, trimmed)
    - `email` (String, required, unique, lowercase, trimmed)
    - `passwordHash` (String, required)
  - Uses Mongoose timestamps (`createdAt`, `updatedAt`).

## 4. Auth Endpoints: Register & Login

- **Auth controller**: `src/controllers/authController.js`

  - `register(req, res)`
    - Endpoint: `POST /api/auth/register`.
    - Expected body:
      ```json
      {
        "name": "User Name",
        "email": "user@example.com",
        "password": "secret123"
      }
      ```
    - Validations:
      - `name`, `email`, `password` are required.
      - Password must be at least 6 characters.
      - Email must be unique (no existing user with that email).
    - Behavior:
      - Hashes the password with `bcrypt`.
      - Creates a new `User` document in MongoDB.
      - Issues a JWT (7-day expiry) with payload `{ id, email, name }`.
    - Response (`201 Created`):
      ```json
      {
        "user": {
          "id": "...",
          "name": "...",
          "email": "..."
        },
        "token": "<jwt-token>"
      }
      ```

  - `login(req, res)`
    - Endpoint: `POST /api/auth/login`.
    - Expected body:
      ```json
      {
        "email": "user@example.com",
        "password": "secret123"
      }
      ```
    - Validations:
      - `email` and `password` are required.
      - If user does not exist or password is invalid, returns `401` with `"Invalid email or password"`.
    - Behavior:
      - Finds the user by lowercased email.
      - Compares the provided password with stored `passwordHash` using `bcrypt.compare`.
      - On success, issues a JWT (same payload and expiry as register).
    - Response (`200 OK`):
      ```json
      {
        "user": {
          "id": "...",
          "name": "...",
          "email": "..."
        },
        "token": "<jwt-token>"
      }
      ```

- **Auth routes**: `src/routes/auth.js`
  - Mounted in `app.js` under `/api/auth`:
    - `POST /api/auth/register`
    - `POST /api/auth/login`

## 5. Required Environment Variables

Add or confirm the following in `backend/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/health-chatbot
JWT_SECRET=your-long-random-secret
API_KEY=your-api-key-for-protected-routes
OPENAI_API_KEY=your-openai-api-key
```

These variables are required for:
- Connecting to MongoDB (`MONGODB_URI`).
- Signing JWTs for auth (`JWT_SECRET`).
- Protecting telemedicine/appointments/records/insurance routes via API key (`API_KEY`).
- Using OpenAI for chat and AI-driven symptom analysis (`OPENAI_API_KEY`).

## 6. Future Work / Next Steps

The following improvements are planned or recommended on top of the current backend changes:

- **MongoDB migration for domain services**
  - Move current in-memory data structures to MongoDB collections, with Mongoose models, for:
    - Appointments (providers, appointments).
    - Telemedicine sessions.
    - Insurance claims.
    - Health records and access logs.
  - Update the corresponding services and controllers to read/write from Mongo instead of arrays.

- **User-based access with JWT**
  - Introduce a JWT auth middleware that reads `Authorization: Bearer <token>`.
  - Attach `req.user` so protected resources (appointments, records, claims) can tie actions to the authenticated user instead of trusting `userId` in the request body.
  - Combine JWT auth with existing API key auth where appropriate.

- **Frontend authentication (login/register)**
  - Add React pages for:
    - `Login` – calls `POST /api/auth/login` and stores the returned JWT.
    - `Register` – calls `POST /api/auth/register` to create a new user and log them in.
  - Wire these pages into the frontend routing and ensure protected UI areas check for a valid JWT.

- **Additional automated tests**
  - Add more unit and integration tests for:
    - Symptom checker (`symptomService`, `symptomController`).
    - Telemedicine (`telemedicineService`, `telemedicineController`).
    - Records and insurance controllers/services.
    - Auth routes (`/api/auth/register`, `/api/auth/login`).
  - Optionally add tests for the API key middleware and future JWT middleware.

These items are not yet fully implemented but are outlined here to guide further development.
