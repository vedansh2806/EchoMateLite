# EchoMateLite – Backend API

## Project Information
| Field | Detail |
|---|---|
| **Student** | Deepak Jain |
| **USN** | 241VMTR01377 |
| **University** | Jain Online (Deemed-to-be University), Bangalore |
| **Program** | MCA Semester IV Capstone Project |
| **Subject** | Cloud Computing |

---

## About the Project
EchoMateLite is a lightweight, cloud-based social media platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and deployed on Amazon Web Services (AWS).

This directory contains the **backend REST API** built with Node.js and Express.js.

---

## Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) with bcryptjs password hashing
- **Deployment:** Amazon EC2 (Production), Localhost (Development)

---

## Project Structure
```
backend/
├── src/
│   ├── config/          # Database and environment configuration
│   ├── controllers/     # Business logic for each route (auth, users, posts)
│   ├── middleware/      # Custom Express middleware (auth guard, error handler)
│   ├── models/          # Mongoose database schemas (User, Post)
│   ├── routes/          # API route definitions
│   └── utils/           # Helper utility functions
├── .env                 # Environment variables (NOT committed to Git)
├── .gitignore           # Files to exclude from Git
├── package.json         # Project dependencies and scripts
└── README.md            # This file
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js v18 or higher installed
- A MongoDB Atlas account and cluster (free M0 tier is sufficient)

### Installation Steps

**1. Install dependencies**
```bash
npm install
```

**2. Configure environment variables**

Open `.env` and fill in your actual values:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/echomatelite
JWT_SECRET=your_super_secret_key
```

**3. Start the development server**
```bash
npm run dev
```

**4. Verify the server is running**

Open your browser or Postman and navigate to:
```
http://localhost:5000/api/health
```
You should receive:
```json
{
  "success": true,
  "message": "EchoMateLite API is healthy and running!",
  "environment": "development",
  "timestamp": "2026-06-29T..."
}
```

---

## API Endpoints (To be built incrementally)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/health` | Health check | No |
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get JWT | No |
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |
| POST | `/api/posts` | Create a new post | Yes |
| GET | `/api/posts` | Get news feed | Yes |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Nodemon (auto-restart on change) |
| `npm start` | Start production server |

---

## AWS Deployment (Production)
- Backend is deployed on **Amazon EC2** (Ubuntu, t2.micro Free Tier)
- API is accessed via **Application Load Balancer** with HTTPS via **AWS ACM**
- Static assets are stored on **Amazon S3**
- Frontend is served via **Amazon CloudFront**
