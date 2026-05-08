# Task Tracker Mobile App

A modern full-stack Task Tracker Mobile Application built using React Native, Expo, TypeScript, Node.js, Express.js, and MongoDB Atlas.

This project was developed as part of a Full Stack Developer Internship Assignment and demonstrates frontend + backend integration, authentication, REST APIs, state management, cloud deployment, and modern mobile UI/UX practices.

---

# Live Backend Deployment

Backend deployed on Render:

```txt
https://task-tracker-mgbj.onrender.com
```

---

# Project Overview

This application allows users to:

* Create an account
* Login securely using JWT authentication
* Create and manage tasks
* Mark tasks as completed
* Delete tasks
* Filter tasks by status
* Track task completion progress
* Persist login sessions
* Experience a modern glassmorphic mobile UI

The project uses:

* React Native with Expo for frontend
* Node.js + Express.js for backend
* MongoDB Atlas for cloud database
* TanStack Query for server state management
* JWT authentication for secure API access
* Render for backend deployment

---

# Features

## Authentication System

### User Signup

* Secure user registration
* Email validation
* Password hashing using bcryptjs
* JWT token generation

### User Login

* JWT-based authentication
* Secure token storage using AsyncStorage
* Persistent user session

### Protected APIs

* Auth middleware for protected routes
* Token verification on each request

---

# Task Management Features

## Core Features

* Create tasks
* View all tasks
* Mark tasks as completed/incomplete
* Delete tasks
* Pull-to-refresh task list
* Real-time task updates

## Task Fields

Each task includes:

* Title
* Optional Description
* Completion Status
* Priority Level
* Created Timestamp

---

# Bonus Features Implemented

## Task Filters

Users can filter tasks by:

* All
* Pending
* Completed

---

## Task Statistics Dashboard

Dashboard cards display:

* Total Tasks
* Completed Tasks
* Pending Tasks

---

## Progress Tracking

Task completion progress bar with completion percentage.

Example:

```txt
75% Tasks Completed
```

---

## Improved UI/UX

### Glassmorphic Design

* Modern translucent cards
* Blur effects
* Soft shadows
* Rounded corners

### Smooth Animations

* Task creation animations
* Completion animations
* Delete transitions

### Empty State UI

* Styled empty task state
* User-friendly placeholders

### Responsive Layout

* Optimized for mobile devices
* Clean typography
* Better spacing and alignment

---

# Tech Stack

# Frontend

| Technology     | Purpose                |
| -------------- | ---------------------- |
| React Native   | Mobile app development |
| Expo           | Development platform   |
| TypeScript     | Type safety            |
| TanStack Query | API state management   |
| Axios          | API requests           |
| AsyncStorage   | Local token storage    |

---

# Backend

| Technology    | Purpose               |
| ------------- | --------------------- |
| Node.js       | Runtime environment   |
| Express.js    | Backend framework     |
| MongoDB Atlas | Cloud database        |
| Mongoose      | MongoDB ODM           |
| JWT           | Authentication        |
| bcryptjs      | Password hashing      |
| dotenv        | Environment variables |

---

# Deployment

| Service       | Purpose            |
| ------------- | ------------------ |
| Render        | Backend hosting    |
| MongoDB Atlas | Database hosting   |
| Expo Go       | Mobile app testing |

---

# Folder Structure

```bash
project-root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   │
│   │   └── index.js
│   │
│   ├── package.json
│   └── .env
│
└── mobile/
    ├── screens/
    │   ├── LoginScreen.tsx
    │   ├── SignupScreen.tsx
    │   └── HomeScreen.tsx
    │
    ├── services/
    │   ├── api.ts
    │   └── queries.ts
    │
    ├── types/
    │   └── index.ts
    │
    ├── App.tsx
    ├── app.json
    └── package.json
```

---

# Backend API Endpoints

# Authentication APIs

## Signup

```http
POST /api/auth/signup
```

### Request Body

```json
{
  "name": "Aditi Jain",
  "email": "aditi@example.com",
  "password": "password123"
}
```

---

## Login

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "aditi@example.com",
  "password": "password123"
}
```

---

# Task APIs

## Get All Tasks

```http
GET /api/tasks
```

Requires JWT Token.

---

## Create Task

```http
POST /api/tasks
```

### Request Body

```json
{
  "title": "Complete Assignment",
  "description": "Finish React Native internship task",
  "priority": "high"
}
```

---

## Update Task

```http
PATCH /api/tasks/:id
```

Used for:

* Marking task completed
* Updating task details

---

## Delete Task

```http
DELETE /api/tasks/:id
```

---

# Authentication Flow

1. User signs up or logs in.
2. Backend validates credentials.
3. Passwords are securely hashed using bcryptjs.
4. JWT token is generated.
5. Token stored locally using AsyncStorage.
6. Frontend attaches token in Authorization headers.
7. Protected APIs validate token using middleware.

---

# Database Schema

# User Schema

Fields:

* name
* email
* password

Passwords are hashed before storing.

---

# Task Schema

Fields:

* title
* description
* completed
* priority
* user reference
* createdAt
* updatedAt

---

# State Management

TanStack Query is used for:

* Fetching tasks
* Creating tasks
* Updating tasks
* Deleting tasks
* Cache invalidation
* Loading states
* Error handling

Benefits:

* Cleaner API handling
* Automatic refetching
* Better UX
* Optimized state synchronization

---

# Security Features

## Password Security

Passwords are hashed using bcryptjs.

---

## JWT Authentication

JWT tokens secure protected routes.

---

## Protected APIs

Task routes require authentication middleware.

---

## Environment Variables

Sensitive credentials stored in `.env`.

---

# Backend Deployment (Render)

The backend is deployed using Render.

## Deployment Steps

1. Push backend code to GitHub
2. Connect repository to Render
3. Configure Root Directory as:

```txt
backend
```

4. Add environment variables:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=production
```

5. Deploy Web Service

---

# MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create cluster
3. Create database user
4. Add IP access
5. Copy MongoDB connection string
6. Add connection string in backend `.env`

---

# Frontend Setup

# Install Dependencies

```bash
cd mobile
npm install
```

---

# Configure API URL

Inside:

```txt
mobile/services/api.ts
```

Use:

```ts
const API_BASE_URL = 'https://task-tracker-mgbj.onrender.com/api';
```

---

# Run Expo App

```bash
npx expo start
```

Then:

* Scan QR code using Expo Go
* Or run on emulator

---

# Backend Setup

# Install Dependencies

```bash
cd backend
npm install
```

---

# Create .env File

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

---

# Run Backend

```bash
npm run dev
```

Expected Output:

```bash
✓ Connected to MongoDB
✓ Server running on http://localhost:5000
```

---

# Running the Full Project

# Terminal 1

```bash
cd backend
npm run dev
```

# Terminal 2

```bash
cd mobile
npx expo start
```

---

# Screens Included

* Login Screen
* Signup Screen
* Home Dashboard
* Task List Screen
* Task Statistics Section
* Progress Tracking UI
* Empty State UI
* Filter Tabs

---

# UI Design Highlights

## Glassmorphism

Modern translucent UI cards with blur effects.

---

## Dark Theme

Custom dark color palette with vibrant accents.

---

## Animations

Smooth transitions and task interactions.

---

## Responsive Mobile Design

Optimized for modern smartphones.

---

# Troubleshooting

# MongoDB Connection Issues

Check:

* Correct MongoDB URI
* Atlas IP whitelist
* Internet connection

---

# Expo Issues

Try:

```bash
npx expo start --clear
```

---

# API Connection Issues

Verify:

* Backend running
* Correct API URL
* Internet access

---

# Future Improvements

* Edit Task Feature
* Push Notifications
* Offline Support
* Calendar Integration
* Due Dates
* Task Categories
* Dark/Light Theme Toggle
* App Store Deployment


---

# Author

Aditi Jain

---

# License

MIT License
