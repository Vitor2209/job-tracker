# Job Tracker – Full Stack Application

A full-stack job application tracker built with Node.js and Vanilla JavaScript.

This project simulates a SaaS-style platform where users can track job applications through different stages of the hiring process.

The application includes a REST API backend and a Kanban-style frontend interface.

---

## Features

- Track job applications
- Kanban board workflow
- Create, edit and delete jobs
- Job status management

Statuses:

- Applied
- Interview
- Offer
- Rejected

- REST API built with Node.js and Express
- MongoDB database
- JWT authentication structure
- Statistics dashboard

---

## Tech Stack

Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- REST API

Frontend

- HTML
- CSS
- Vanilla JavaScript

---

## Project Structure


job-tracker
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ └── server.js
│
├── frontend
│ ├── css
│ ├── js
│ └── index.html
│
└── README.md


---

## API Endpoints

Authentication

POST /api/auth/register  
POST /api/auth/login  

Jobs

GET /api/jobs  
POST /api/jobs  
PATCH /api/jobs/:id  
DELETE /api/jobs/:id  
GET /api/jobs/stats  

---

## Installation

Clone the repository


git clone https://github.com/yourusername/job-tracker.git


Install backend dependencies


cd backend
npm install


Start the server


npm run dev


Open frontend


open frontend/index.html


---

## Future Improvements

- Login and authentication UI
- Drag and drop Kanban board
- Advanced job filtering
- Cloud deployment
- Multi-user support

---

## Author

Vitor Dutra Melo  
Backend Developer – Node.js / JavaScript
