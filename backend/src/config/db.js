// ============================================================
// db.js – MongoDB Database Connection
// ============================================================
// WHY THIS FILE EXISTS:
//   This file is responsible for one job only: connecting the
//   application to MongoDB Atlas. By keeping it separate, we
//   follow the "Single Responsibility Principle" — a professional
//   software architecture pattern.
//
// HOW IT WORKS:
//   It uses Mongoose (a library that wraps MongoDB) to establish
//   a connection using the MONGO_URI stored in our .env file.
//   If the connection succeeds, it logs the host address.
//   If it fails (wrong URI, network issue), it logs the error
//   and exits the process with code 1 (failure) so the app
//   does not run without a database.
// ============================================================

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // mongoose.connect() returns a promise, so we await it.
    // process.env.MONGO_URI is read from our .env file via dotenv.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // On success, print the host of the MongoDB cluster we connected to
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // On failure, print the specific error message
    console.error(`❌ Database Connection Error: ${error.message}`);

    // Exit the Node.js process immediately.
    // Code 1 signals that the process exited with an ERROR.
    // Code 0 would mean a clean, successful exit.
    process.exit(1);
  }
};

module.exports = connectDB;
