# FarmInvest Lite

Small full-stack demo consisting of:
- **mobile_backend** – Express + TypeScript + MySQL API for investments
- **mobile_frontend** – Expo React Native app that lists and creates investments

This README explains how to run both parts locally for the coding challenge submission.

## Folder structure

- [mobile_backend](mobile_backend) – REST API (`/api/investments`, `/api/login`)
- [mobile_frontend](mobile_frontend) – Expo app (FarmInvest Lite)

## Prerequisites

- Node.js (LTS) and npm
- MySQL 8.x (or compatible)
- Expo CLI (installed via `npm install -g expo-cli`) and either:
	- Android emulator / iOS simulator, or
	- Expo Go app on a physical device

---

## 1. Backend (Express + MySQL)

Location: [mobile_backend](mobile_backend)

### 1.1 Install dependencies

```bash
cd mobile_backend
npm install
```

### 1.2 Configure environment

Backend uses a `.env` file with the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=farminvest
PORT=3000
```

You can adjust these values to match your local MySQL setup.

### 1.3 Create database schema

You can use the provided SQL files in [mobile_backend](mobile_backend):

- Schema: [mobile_backend/schema.sql](mobile_backend/schema.sql)
- Seed data: [mobile_backend/seed.sql](mobile_backend/seed.sql)

From a MySQL client:

```sql
SOURCE path/to/FarmInvest_Lite/mobile_backend/schema.sql;
SOURCE path/to/FarmInvest_Lite/mobile_backend/seed.sql;
```

### 1.4 Run the backend

Development (with auto-reload):

```bash
cd mobile_backend
npm run dev
```

Production-style run:

```bash
npm start
```

By default the API is available at `http://localhost:3000`.

### 1.5 API endpoints

- `GET /api/investments`
	- Returns a list of investments: `[{ id, farmer_name, amount, crop, created_at }]`.
- `POST /api/investments`
	- Body: `{ farmer_name: string, crop: string, amount: number, user_id?: number }`
	- Creates a new investment row and returns the created record.
- `POST /api/login`
	- Minimal demo login using the `users` table.

### 1.6 Quick curl examples

```bash
# List investments
curl http://localhost:3000/api/investments

# Create a new investment
curl -X POST http://localhost:3000/api/investments \
	-H "Content-Type: application/json" \
	-d '{"farmer_name":"Farmer Carol","crop":"Rice","amount":2000}'
```

You can also import the Postman collection from:

- [postman/FarmInvest_Lite.postman_collection.json](postman/FarmInvest_Lite.postman_collection.json)

---

## 2. Mobile app (Expo React Native)

Location: [mobile_frontend](mobile_frontend)

The Expo app:
- Fetches investments from `/api/investments` and displays them in a `FlatList`.
- Provides a "New Investment" flow that POSTs to `/api/investments` and updates the list optimistically.
- Handles loading, error states, and pull-to-refresh.

### 2.1 Install dependencies

```bash
cd mobile_frontend
npm install
```

### 2.2 Point app to local backend

The app uses `EXPO_PUBLIC_BACKEND_URL` (see `src/Services/api.ts`). Create or edit `.env` in `mobile_frontend`:

```env
EXPO_PUBLIC_BACKEND_URL=http://YOUR_LOCAL_IP:3000
```

On physical devices, `YOUR_LOCAL_IP` must be your machine's LAN IP (for example `http://192.168.1.10:3000`), not `localhost`.

Restart Expo after changing `.env` so the new value is picked up.

### 2.3 Run the Expo app

```bash
cd mobile_frontend
npm start
```

This will open Expo Dev Tools in the browser. From there you can:
- Press `a` to launch the Android emulator
- Press `i` to launch the iOS simulator (on macOS)
- Scan the QR code with the Expo Go app on a physical device

Ensure the backend is running and accessible at `EXPO_PUBLIC_BACKEND_URL`.

---

## 3. Testing

The goal for the assignment is to have at least one Jest + React Native Testing Library test that verifies UI behaviour (e.g. investments list renders items).

Once tests are added under `mobile_frontend`, they can be run with:

```bash
cd mobile_frontend
npm test
```

If you also add backend tests, document their commands in this section similarly.

---

## 4. Notes for reviewers

- Backend uses TypeScript with `ts-node` and `mysql2/promise` for parameterized queries.
- Frontend is written in TypeScript and uses React Navigation for a simple list/detail flow.
- Environment variables:
	- Backend: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`
	- Frontend: `EXPO_PUBLIC_BACKEND_URL`

This README serves as the main `readme`/runbook required for submission.