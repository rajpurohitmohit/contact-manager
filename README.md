# Contact Manager

A full-stack app for managing personal contacts. Users register, log in, and get their own isolated contact list — no one else can read or modify your data.

Built to practice building a complete authentication flow end-to-end: JWT issuance, secure storage, protected routes on both the client and API, and user-scoped data in MongoDB.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT (15-min expiry), bcrypt (cost 10) |
| Frontend | Next.js 16, React 19, TypeScript |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Styling | Tailwind CSS v4, Framer Motion |

---

## Features

- Register and log in — passwords are hashed with bcrypt before storage
- JWT-based auth — tokens expire in 15 minutes, issued on login
- Protected routes — unauthenticated users are redirected to `/login` on both the API and client side
- CRUD for contacts (name, email, phone) — each contact is tied to the user who created it
- Client-side search — filters by name, email, or phone without hitting the API
- Type-safe forms — Zod schemas shared between validation and TypeScript types

---

## Project Structure

```
contact-manager/
├── client/          # Next.js 16 app (TypeScript)
│   ├── app/
│   │   ├── (auth)/       # /login, /register
│   │   └── (dashboard)/  # /contacts, /contacts/new, /contacts/[id]
│   ├── stores/      # Zustand stores: authStore, contactStore
│   └── lib/api/     # Axios API clients
└── server/          # Express REST API
    ├── controllers/ # Business logic
    ├── middleware/  # JWT validation, error handler
    ├── models/      # Mongoose schemas
    └── routes/      # Route definitions
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally, or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string

### 1. Backend

```bash
cd server
npm install
```

Create `server/.env`:

```
CONNECTION_STRING=mongodb://localhost:27017/contactmanager
ACCESS_TOKEN_SECRET=any_long_random_string
PORT=5001
```

```bash
npm run dev
```

Server starts on `http://localhost:5001`.

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000` — it redirects to `/contacts`, which sends you to `/login` if you're not authenticated.

---

## API Reference

All `/api/contacts` endpoints require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/users/register` | Public | Register a new user |
| `POST` | `/api/users/login` | Public | Login — returns JWT |
| `GET` | `/api/users/current` | Private | Get the current user |
| `GET` | `/api/contacts` | Private | List all contacts for the user |
| `POST` | `/api/contacts` | Private | Create a contact |
| `GET` | `/api/contacts/:id` | Private | Get a single contact |
| `PUT` | `/api/contacts/:id` | Private | Update a contact |
| `DELETE` | `/api/contacts/:id` | Private | Delete a contact |

---

## Screenshots

> Add screenshots here after taking them. Suggested captures: contacts list, login page, add contact form.
> Place images in a `screenshots/` folder and update the paths below.

<!-- ![Contacts Page](./screenshots/contacts.png) -->
<!-- ![Login Page](./screenshots/login.png) -->

---

## What I'd improve next

- Refresh token flow — 15-minute JWTs mean users get logged out frequently; a refresh token in an HTTP-only cookie would fix this
- Search on the server — client-side filtering works fine at small scale, but an indexed MongoDB text search would be more robust
- Deploy — frontend to Vercel, backend to Railway or Render