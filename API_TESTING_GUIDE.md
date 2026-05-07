# API Testing Guide

Complete guide for testing the Task Tracker API using curl, Postman, or Thunder Client.

---

## Health Check

### Endpoint
```
GET /api/health
```

### curl
```bash
curl http://localhost:5000/api/health
```

### Response
```json
{
  "message": "Server is running"
}
```

---

## Authentication Endpoints

### 1. User Signup

#### Endpoint
```
POST /api/auth/signup
```

#### curl
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Success Response (201)
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBlZDg0YTkwZTI0YzAwMDExMjM0NTYiLCJpYXQiOjE3MjExNTI3ODksImV4cCI6MTcyMTc1NzU4OX0.abc123xyz",
  "user": {
    "id": "670ed84a90e24c00011234567",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Error Response (400)
```json
{
  "message": "Email already registered"
}
```

#### Validation Rules
- `name`: Required, must not be empty
- `email`: Required, must be valid email format
- `password`: Required, minimum 6 characters
- `confirmPassword`: Required, must match password

---

### 2. User Login

#### Endpoint
```
POST /api/auth/login
```

#### curl
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "670ed84a90e24c00011234567",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Error Response (401)
```json
{
  "message": "Invalid email or password"
}
```

#### Notes
- Save the `token` value for subsequent requests
- Token expires in 7 days
- Include token in `Authorization: Bearer TOKEN` header

---

## Task Endpoints

**⚠️ All task endpoints require authentication**

Include the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. Get All Tasks

#### Endpoint
```
GET /api/tasks
```

#### curl
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Success Response (200)
```json
{
  "success": true,
  "tasks": [
    {
      "_id": "670ed84a90e24c00011234568",
      "title": "Complete project",
      "description": "Finish the task tracker app",
      "completed": false,
      "priority": "high",
      "userId": "670ed84a90e24c00011234567",
      "createdAt": "2024-10-20T10:30:00.000Z",
      "updatedAt": "2024-10-20T10:30:00.000Z"
    },
    {
      "_id": "670ed84a90e24c00011234569",
      "title": "Review code",
      "description": "Code review for the backend",
      "completed": true,
      "priority": "medium",
      "userId": "670ed84a90e24c00011234567",
      "createdAt": "2024-10-19T15:45:00.000Z",
      "updatedAt": "2024-10-20T08:00:00.000Z"
    }
  ]
}
```

#### Error Response (401)
```json
{
  "message": "No token provided"
}
```

---

### 4. Create Task

#### Endpoint
```
POST /api/tasks
```

#### curl
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Learn MongoDB",
    "description": "Study MongoDB queries and indexing",
    "priority": "medium"
  }'
```

#### Request Body
```json
{
  "title": "Learn MongoDB",
  "description": "Study MongoDB queries and indexing",
  "priority": "medium"
}
```

#### Success Response (201)
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "670ed84a90e24c0001123456a",
    "title": "Learn MongoDB",
    "description": "Study MongoDB queries and indexing",
    "completed": false,
    "priority": "medium",
    "userId": "670ed84a90e24c00011234567",
    "createdAt": "2024-10-20T11:00:00.000Z",
    "updatedAt": "2024-10-20T11:00:00.000Z"
  }
}
```

#### Validation Rules
- `title`: Required, must not be empty
- `description`: Optional, empty string if not provided
- `priority`: Optional, defaults to "medium", must be: "low" | "medium" | "high"

---

### 5. Update Task

#### Endpoint
```
PUT /api/tasks/:id
```

Replace `:id` with the task's `_id`

#### curl - Mark as Complete
```bash
curl -X PUT http://localhost:5000/api/tasks/670ed84a90e24c00011234568 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "completed": true
  }'
```

#### curl - Change Priority
```bash
curl -X PUT http://localhost:5000/api/tasks/670ed84a90e24c00011234568 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "priority": "high"
  }'
```

#### curl - Update Title & Description
```bash
curl -X PUT http://localhost:5000/api/tasks/670ed84a90e24c00011234568 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated task title",
    "description": "Updated description"
  }'
```

#### Request Body (partial update)
```json
{
  "title": "New title",
  "description": "New description",
  "completed": true,
  "priority": "high"
}
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "_id": "670ed84a90e24c00011234568",
    "title": "New title",
    "description": "New description",
    "completed": true,
    "priority": "high",
    "userId": "670ed84a90e24c00011234567",
    "createdAt": "2024-10-20T10:30:00.000Z",
    "updatedAt": "2024-10-20T11:30:00.000Z"
  }
}
```

#### Error Response (404)
```json
{
  "message": "Task not found"
}
```

---

### 6. Delete Task

#### Endpoint
```
DELETE /api/tasks/:id
```

Replace `:id` with the task's `_id`

#### curl
```bash
curl -X DELETE http://localhost:5000/api/tasks/670ed84a90e24c00011234568 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Success Response (200)
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### Error Response (404)
```json
{
  "message": "Task not found"
}
```

---

## Using Thunder Client (VS Code)

Thunder Client is a REST client extension for VS Code. Here's how to use it:

### Step 1: Install Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Thunder Client"
4. Install by rangav

### Step 2: Create First Request
1. Click Thunder Client icon in sidebar
2. Click "New Request"
3. Set method to POST
4. Set URL to: `http://localhost:5000/api/auth/login`

### Step 3: Add Headers
Click "Headers" tab and add:
```
Content-Type: application/json
```

### Step 4: Add Body
Click "Body" tab and add:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Step 5: Send Request
Click "Send" button

### Step 6: Use Token
1. Copy the `token` from response
2. Create new request
3. Go to Headers tab
4. Add: `Authorization: Bearer TOKEN_HERE`

---

## Using Postman

### Step 1: Download & Install
Go to [postman.com](https://www.postman.com/downloads/) and install

### Step 2: Create Collection
1. Click "New" → "Collection"
2. Name it "Task Tracker API"

### Step 3: Add Requests
1. Click "Add Request"
2. Name it "Signup"
3. Set method to POST
4. Set URL

### Step 4: Environment Variables
1. Click "Environments" in left sidebar
2. Click "Create New"
3. Add variable: `base_url` = `http://localhost:5000`
4. Add variable: `token` = (leave empty initially)
5. Click Save

### Step 5: Use Variables in Requests
- URL: `{{base_url}}/api/auth/login`
- Header: `Authorization: Bearer {{token}}`

### Step 6: Save Token Automatically
In the "Tests" tab of a request:
```javascript
if (pm.response.code === 200) {
  pm.environment.set("token", pm.response.json().token);
}
```

---

## Testing Workflow

### Complete Test Sequence

1. **Signup New User**
   - POST `/api/auth/signup`
   - Provide name, email, password, confirmPassword
   - Save the returned token

2. **Login with Credentials**
   - POST `/api/auth/login`
   - Provide email and password
   - Verify token received
   - Save token for next requests

3. **Create First Task**
   - POST `/api/tasks`
   - Add Authorization header with token
   - Create task with title and priority
   - Note the returned `_id`

4. **Get All Tasks**
   - GET `/api/tasks`
   - Add Authorization header
   - Verify task appears in list

5. **Update Task**
   - PUT `/api/tasks/{id}`
   - Update completed to true
   - Verify update successful

6. **Delete Task**
   - DELETE `/api/tasks/{id}`
   - Verify success message
   - GET `/api/tasks` to confirm deletion

---

## Common Errors & Solutions

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

**Solution**: Add Authorization header:
```
Authorization: Bearer YOUR_TOKEN
```

### 401 Invalid Token
```json
{
  "message": "Invalid token"
}
```

**Solution**: 
- Check token is correct (copy exactly)
- Token may have expired (7 days)
- Login again to get new token

### 404 Not Found
```json
{
  "message": "Task not found"
}
```

**Solution**:
- Verify task ID is correct
- Verify you own the task (created it)
- Task may have been deleted

### 400 Validation Error
```json
{
  "message": "Email already registered"
}
```

**Solution**: Use different email for signup

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "..."
}
```

**Solution**:
- Check backend is running
- Check MongoDB connection
- Review server logs

---

## Performance Tips

1. **Batch Requests**: Test multiple tasks at once
2. **Use Collections**: Organize requests by feature
3. **Set Timeouts**: Postman/Thunder Client has default 5 second timeout
4. **Monitor Network**: Check latency in DevTools
5. **Cache Results**: Save responses for reference

---

## Scripting Examples

### JavaScript - Fetch API

```javascript
// Signup
const signupResponse = await fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  })
});
const { token } = await signupResponse.json();

// Get Tasks
const tasksResponse = await fetch('http://localhost:5000/api/tasks', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const { tasks } = await tasksResponse.json();
console.log(tasks);
```

### Node.js - Axios

```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Signup
const { data } = await api.post('/auth/signup', {
  name: 'John',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123'
});

// Set token for future requests
api.defaults.headers.Authorization = `Bearer ${data.token}`;

// Get tasks
const { data: tasks } = await api.get('/tasks');
console.log(tasks);
```

---

**Ready to test? Start with the Health Check endpoint and work your way through the workflow!** ✅
