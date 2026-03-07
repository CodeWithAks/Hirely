# Hirely – MERN Job Portal

Hirely is a full-stack job portal built using the MERN stack.
It allows recruiters to post jobs and manage applications, while candidates can browse, search, and apply for jobs securely.

The application implements authentication, role-based access control, and structured state management.

# Tech Stack :

-Frontend
React.js (Vite)
Redux Toolkit
Tailwind CSS

-Backend
Node.js
Express.js
JWT Authentication
Middleware
Database
MongoDB (Mongoose)

-Deployment
Frontend: Vercel
Backend: Render

# Key features :
1. JWT-based authentication with bcrypt password encryption
2. Role-based access control (Recruiter / Candidate)
3. RESTful APIs for job posting and application workflows
4. Global state management using Redux Toolkit
5. Job search and filtering functionality
6. Persistent login state
7. Secure cross-origin communication between frontend and backend

# Architecture :
React frontend communicates with Express backend via REST APIs
JWT stored securely for protected routes
MongoDB schemas designed for Users, Jobs, Companies, and Applications
Frontend and backend deployed as separate services

# Installation :
```bash

1. Clone the repository :
git clone <repository-url>
cd hirely

2. Install dependencies :
- Backend :
cd backend
npm install

- Frontend :
cd frontend
npm install

3. Configure Environment Variables :
Create a .env file in the backend directory and add:
PORT=
MONGO_URI=
JWT_SECRET=

4. Run the application :
- Backend :
npm run dev

- Frontend :
npm run dev

```
# Live Demo : 
https://hirely-portal.vercel.app/


















