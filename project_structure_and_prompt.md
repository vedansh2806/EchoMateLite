# 🏗️ EchoMateLite: Project Structure & ChatGPT Prompt

Here is the ideal project structure for your MERN stack application, followed by a detailed prompt you can use with ChatGPT to get assistance with coding the project.

## 📂 1. Recommended Project Structure (MERN Stack)

We will use a standard monorepo structure with separate `frontend` and `backend` directories to keep things organized.

```text
EchoMateLite/
├── backend/                  # Node.js & Express API
│   ├── src/
│   │   ├── config/           # Database & environment configurations (e.g., db.js)
│   │   ├── controllers/      # Route logic (authController.js, postController.js, userController.js)
│   │   ├── middleware/       # Custom middleware (authMiddleware.js, errorMiddleware.js)
│   │   ├── models/           # Mongoose schemas (User.js, Post.js)
│   │   ├── routes/           # API routes (authRoutes.js, postRoutes.js, userRoutes.js)
│   │   ├── utils/            # Helper functions (generateToken.js)
│   │   └── server.js         # Entry point for backend
│   ├── .env                  # Backend environment variables (DB URI, JWT Secret)
│   └── package.json          # Backend dependencies
│
├── frontend/                 # React.js Application
│   ├── public/               # Static files (index.html, favicon)
│   ├── src/
│   │   ├── assets/           # Images, global CSS
│   │   ├── components/       # Reusable UI components (Navbar, PostCard, Button)
│   │   ├── context/          # React Context API for state management (AuthContext)
│   │   ├── pages/            # Main page views (Login, Register, Home/Feed, Profile)
│   │   ├── services/         # API call functions (api.js)
│   │   ├── App.jsx           # Main React component & routing
│   │   └── main.jsx          # React DOM rendering entry
│   ├── .env                  # Frontend environment variables (Vite API URL)
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration (if using Vite instead of CRA)
│
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation
```

---

## 🤖 2. Prompt for ChatGPT

Copy and paste the text in the box below into ChatGPT. It provides ChatGPT with all the context about your university assignment, the tech stack, the architecture, and the specific tasks you need help with.

> [!TIP]
> **Instructions:** Copy the text below exactly as it is and paste it into a new ChatGPT chat.

***

**Copy everything below this line:**

```text
Act as an expert Full-Stack MERN Developer and AWS Cloud Architect. I need your help building my final semester MCA Capstone Project called "EchoMateLite".

### Project Context
- **Course:** Master of Computer Application (MCA) - Semester IV, Jain Online University.
- **Subject:** Cloud Computing Capstone Project.
- **Project Name:** EchoMateLite
- **Description:** A lightweight social media platform allowing users to create profiles, post messages, and view feeds.
- **Tech Stack:** MERN Stack (MongoDB, Express.js, React.js, Node.js).
- **Deployment:** The application must eventually be deployed on AWS (EC2, S3, CloudFront, MongoDB Atlas, Cognito/JWT).

### Key Features Required
1. **User Authentication:** Secure registration and login. Passwords hashed with bcrypt. JWT-based session management.
2. **Profile Management:** Users can create and edit profiles (Full Name, Bio, Profile Picture).
3. **Post Creation & Viewing:** Users can create text posts. A global news feed displays posts from all users in reverse chronological order.
4. **Responsive UI:** A modern, clean, responsive frontend built with React.

### Project Structure
We are using a split repository structure:
- `/backend`: Node/Express REST API connecting to MongoDB.
- `/frontend`: React application (using Vite) connecting to the backend API.

### How I Need Your Help
I need to build this project step-by-step. I do not want you to write the entire application at once. Instead, I want you to guide me through the development process. 

Please acknowledge that you understand the project requirements, and then provide me with the terminal commands and code to complete **Step 1** only. 

**Step 1:** Initialize the backend. Create the `backend` folder, initialize `package.json`, install the necessary dependencies (express, mongoose, dotenv, cors, bcryptjs, jsonwebtoken), and write the basic `server.js` file to start an Express server connecting to MongoDB. 

Wait for me to say "Next" before moving to Step 2 (which will be creating the User Model and Auth Routes).
```

**Copy everything above this line.**

***

## 📝 3. Next Steps for Us

While you use that prompt with ChatGPT to start writing the code, I can assist you with the other requirements. 

What would you like me to focus on right now?
1. **Initialize the Project Structure here:** I can run the commands in this workspace to create the `backend` and `frontend` folders and set up the initial configuration files for you.
2. **Draft the Interim Report:** I can start writing the `CC_Interim Report Template.docx` (worth 15% of your grade), generating the Architecture Diagram and filling in the Literature Review and Solution Architecture sections based on the synopsis we just created.

Let me know what you prefer!
