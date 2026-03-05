# Job Tracker API

A RESTful backend API built with **Node.js, Express, and MongoDB** that allows users to track their job applications.

This project simulates a real-world SaaS backend where users can create an account, authenticate securely, and manage their job applications.

It was built as part of my backend learning journey to practice authentication, database design, and API architecture.

---

## Features

* User Registration
* User Login
* Password Hashing with **bcrypt**
* Authentication with **JWT**
* Protected Routes
* Get Logged User Profile
* MongoDB Atlas Integration

Upcoming features:

* Create Job Application
* List Job Applications
* Update Job Status
* Delete Job Application
* Filtering and Search

---

## Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB Atlas**
* **Mongoose**
* **JWT (JSON Web Token)**
* **bcrypt**
* **Thunder Client** for API testing

---

## Project Structure

backend/

```
controllers/
authController.js
userController.js

middleware/
authMiddleware.js

models/
User.js

routes/
authRoutes.js
userRoutes.js

server.js
.env
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/job-tracker.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## API Endpoints

### Register User

POST

```
/api/auth/register
```

Example body:

```json
{
  "name": "Vitor",
  "email": "vitor@email.com",
  "password": "123456"
}
```

---

### Login

POST

```
/api/auth/login
```

Example body:

```json
{
  "email": "vitor@email.com",
  "password": "123456"
}
```

Returns:

```
JWT Token
```

---

### Get Logged User

GET

```
/api/users/me
```

Header:

```
Authorization: Bearer TOKEN
```

---

## Future Improvements

* Job CRUD system
* Filtering jobs by status
* Pagination
* API validation
* Docker support
* Deployment

---

## Author

**Vitor Dutra Melo**

Backend Developer in training currently focused on building real-world backend projects using **Node.js and MongoDB**.

---

## License

This project is licensed under the MIT License.
