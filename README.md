# Food Ordering App

A full-stack food ordering application with customer ordering, admin order management, bilingual Arabic/English UI, and role-based navigation.

## Features

- Customer registration and login
- Product menu with Arabic/English support
- Cart and checkout flow for customers
- Customer order history with live status display
- Admin dashboard for viewing orders and updating order status
- Role-based UI, including hidden cart controls for admins
- Responsive professional interface with a navbar

## Demo Accounts

### User

- Email: `john@test.com`
- Password: `123456`

### Admin

- Email: `admin@test.com`
- Password: `123456`

## Tech Stack

- Frontend: React, Vite, React Router, i18next
- Backend: Node.js, Express, MongoDB, Mongoose, JWT

## Project Structure

```text
food-ordering-app/
  backend/
    controllers/
    middleware/
    models/
    routes/
    server.js
  frontend/
    src/
      components/
      context/
      pages/
      services/
```

## Environment Variables

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Run Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Frontend runs on Vite, usually at `http://localhost:5173`.
Backend runs on `http://localhost:5000`.

## Useful Commands

Frontend lint:

```bash
cd frontend
npm run lint
```

Frontend production build:

```bash
cd frontend
npm run build
```
