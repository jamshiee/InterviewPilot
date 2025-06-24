<a href="https://ibb.co/jkDXh3m5"><img src="https://i.ibb.co/3mcZ1S2s/Screenshot-2025-06-24-181941.png" alt="Screenshot-2025-06-24-181941" border="0"></a>

# 🎯 InterviewPilot

[![Live Demo](https://img.shields.io/badge/Live%20Demo-online-brightgreen)](https://interview-pilot.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)]

**InterviewPilot** is your personal AI-powered Interview Tool. It generates dynamic, role-specific questions and answers based on your experience and tracks your various session securely using JWT-based authentication.

Try it now → [https://interview-pilot.vercel.app](https://interview-pilot.vercel.app)

---

## ✨ Features

- 🤖 **AI-Driven Questions** – Generated using **Gemini**, based on your job role and experience.
- 🔐 **Secure User Auth** – JWT-based authentication to manage sessions and protect user data.
- 📦 **MongoDB Database** – For storing user profiles, sessions, and interview histories.
- 🌐 **Deployed on Vercel** – Fast and reliable deployment pipeline.

---

## 🧱 Tech Stack

| Layer       | Technology               |
|-------------|---------------------------|
| Frontend    | React, Tailwind CSS       |
| Backend     | Node.js, Express          |
| AI Engine   | Gemini (Google)           |
| Database    | MongoDB (Mongoose)        |
| Auth        | JWT (JSON Web Tokens)     |
| Hosting     | Vercel , Render           |

---

## 🔐 Authentication

- **JWT-based Auth Flow**  
  - Users sign up or log in.
  - A JWT is issued and stored securely in `localStorage`.
  - Protected routes verify JWT for API access.
  - Enables session tracking and history per user.

---

## Environment Variables

- PORT=5000
- MONGODB_URI=your_mongodb_uri
- JWT_SECRET=your_super_secret_jwt_key
- GEMINI_API_KEY=your_gemini_api_key
