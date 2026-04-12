# Assignment 7 MERN CRUD Application

This project contains a MERN stack CRUD dashboard for:

- Student Registration System
- Library Management System
- Employee Management System

## Features

- Insert records using React forms
- Search records by unique key
- Update existing records
- Delete records
- View all records in a table

## Project Structure

- `client/` - React + Vite frontend
- `server/` - Express + MongoDB backend

## Backend Setup

1. Copy `server/.env.example` to `server/.env`.
2. Make sure MongoDB is running locally or replace `MONGO_URI` with your own connection string.
3. Start the backend:

```bash
npm run server
```

## Frontend Setup

Start the Vite frontend:

```bash
npm run client
```

The frontend runs on `http://localhost:5173` and proxies API calls to `http://localhost:5000`.
