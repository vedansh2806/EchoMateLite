// ============================================================
// server.js – Main Application Entry Point
// ============================================================
// WHY THIS FILE EXISTS:
//   This is the "heart" of the entire backend. When you run
//   "npm run dev" or "npm start", Node.js runs THIS file first.
//   It is responsible for:
//     1. Loading environment variables from .env
//     2. Connecting to the MongoDB database
//     3. Creating the Express application
//     4. Registering all middleware (CORS, JSON body parsing)
//     5. Mounting all API routes
//     6. Starting the HTTP server on a configured port
//     7. Handling unexpected runtime errors gracefully
// ============================================================

// ---- Step 1: Import Required Packages ----
const express = require('express');   // Web framework for handling HTTP requests
const cors = require('cors');         // Allows cross-origin requests (frontend -> backend)
const dotenv = require('dotenv');     // Loads variables from .env into process.env

// ---- Step 2: Import Internal Modules ----
const connectDB = require('./config/db'); // Our database connection function

// ---- Step 3: Load Environment Variables ----
// This MUST be called before any other code that uses process.env
dotenv.config();

// ---- Step 4: Connect to MongoDB Database ----
// This calls our connectDB function from config/db.js
connectDB();

// ---- Step 5: Initialize Express Application ----
const app = express();

// ============================================================
// MIDDLEWARE SETUP
// Middleware runs on EVERY request before it reaches a route.
// Think of it as a "processing pipeline" for all incoming data.
// ============================================================

// --- Middleware 1: JSON Body Parser ---
// This allows Express to read and understand JSON data sent in
// the body of POST/PUT requests (e.g., login form, creating a post).
// Without this, req.body would be undefined.
app.use(express.json());

// --- Middleware 2: URL-Encoded Body Parser ---
// This allows Express to parse data from HTML forms submitted
// with application/x-www-form-urlencoded encoding.
app.use(express.urlencoded({ extended: true }));

// --- Middleware 3: CORS (Cross-Origin Resource Sharing) ---
// By default, browsers block requests from one domain (frontend)
// to a different domain (backend API). CORS headers tell the
// browser it is safe to allow these cross-origin requests.
// In production, we restrict this to only our CloudFront URL.
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// ============================================================
// API ROUTES
// ============================================================

// --- Health Check Route ---
// Purpose: A simple API endpoint that can be called at any time
// to confirm the server and database are up and running.
// This is used in production monitoring and for university demos.
// URL: GET http://localhost:5000/api/health
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'EchoMateLite API is healthy and running!',
    project: 'EchoMateLite',
    version: '1.0.0',
    student: 'Deepak Jain | USN: 241VMTR01377',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// --- Root Route ---
// Purpose: Friendly welcome message for anyone who navigates
// to the root URL of the API (e.g., in production, the EC2 IP).
// URL: GET http://localhost:5000/
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the EchoMateLite API.',
    documentation: 'Send a GET request to /api/health to check API status.',
  });
});

// --- 404 Handler (Catch-All Route) ---
// If a request is made to any route that does NOT exist, this
// middleware catches it and returns a clean 404 JSON response
// instead of the default Express HTML error page.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// --- Global Error Handler ---
// This catches any errors that are passed via next(error) from
// any route or middleware in the application. Having a centralized
// error handler ensures consistent error responses across the API.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Log the error stack in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Server Error:', err.stack);
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An internal server error occurred.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ============================================================
// START THE SERVER
// ============================================================

// Read the port from environment variables, or default to 5000
const PORT = process.env.PORT || 5000;

// app.listen() starts the HTTP server and begins listening
// for incoming connections on the specified port.
const server = app.listen(PORT, () => {
  console.log('============================================================');
  console.log(`🚀 Server running in [${process.env.NODE_ENV}] mode on port ${PORT}`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
  console.log('============================================================');
});

// ---- Unhandled Promise Rejection Handler ----
// If any async operation (like a DB query) throws an error
// that is never caught, Node.js emits this event.
// We close the server gracefully before exiting.
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Promise Rejection: ${err.message}`);
  server.close(() => {
    console.log('Server shutting down due to unhandled promise rejection.');
    process.exit(1);
  });
});
