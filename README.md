# Task Management System

A full-stack task management application built with Node.js, Express, MongoDB, and React.

## Features

- User Authentication (JWT)
- Create, Update, Delete Tasks
- Search Tasks
- Filter by Status
- Pagination
- Responsive UI

## Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB
- Frontend: React.js
- Auth: JWT

## Installation

### Backend

cd backend  
npm install  
npm run dev  

### Frontend

cd frontend  
npm install  
npm start  

## Environment Variables

Create a `.env` file in backend:

MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret  

## API Endpoints

- POST /api/auth/register  
- POST /api/auth/login  
- GET /api/tasks  
- POST /api/tasks  
- PUT /api/tasks/:id  
- DELETE /api/tasks/:id  

## Live Demo

Frontend: (your vercel link)  
Backend: (your render link)

## Author

Ajmal