# DoseTrack

A medication management and adherence tracking web app based on the supplied project presentation.

## Features
- Patient registration and login with bcrypt password hashing and JWT sessions
- Medication create, read, update and delete
- Dose schedules linked to medicines
- Today's dose list with Taken/Missed status tracking
- Dose history and 30-day adherence summary
- Doctor contact directory and appointment request records
- MySQL schema, responsive web UI, and server-side reminder scheduler

## Stack
- Frontend: HTML5, CSS3, vanilla JavaScript
- Backend: Node.js, Express
- Database: MySQL 8
- Auth: bcryptjs and JSON Web Tokens
- Scheduler: node-cron

## Setup
1. Install Node.js 20+ and MySQL 8+.
2. Create a database: `CREATE DATABASE dosetrack;`
3. Apply the schema: `mysql -u root -p dosetrack < database/schema.sql`
4. Copy `.env.example` to `.env` and set database credentials plus a strong `JWT_SECRET`.
5. Install dependencies with `npm install`.
6. Start with `npm run dev`, then open http://localhost:3000.

## Safety and limitations
DoseTrack is a reminder and record-keeping tool, not a diagnostic system. Follow your prescribing clinician's instructions. The current scheduler records due reminders on the server; real SMS, email or push delivery requires an external provider integration. Appointment requests are stored locally and must be confirmed directly with the clinic.
