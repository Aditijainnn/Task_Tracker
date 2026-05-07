# MongoDB Schema Documentation

This document describes the MongoDB collections and their structure for the Task Tracker application.

## Collections Overview

The application uses two main collections:
1. **users** - Stores user account information
2. **tasks** - Stores task data with user references

---

## Users Collection

### Schema

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Field Descriptions

| Field | Type | Description | Validation |
|-------|------|-------------|-----------|
| `_id` | ObjectId | MongoDB unique identifier | Auto-generated |
| `name` | String | User's full name | Required, trimmed |
| `email` | String | User's email address | Required, unique, lowercase, email format |
| `password` | String | Hashed password (bcrypt) | Required, min 6 chars, hashed |
| `createdAt` | Date | Account creation timestamp | Auto-generated |
| `updatedAt` | Date | Last account update timestamp | Auto-generated |

### Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36DGJw36",
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

### Indexes

```javascript
// Unique email index
db.users.createIndex({ email: 1 }, { unique: true })
```

### Security Notes

- Passwords are **hashed with bcrypt** (salt rounds: 10)
- Raw passwords are **never stored**
- Password verification uses `bcryptjs.compare()`
- Email is case-insensitive (stored as lowercase)

---

## Tasks Collection

### Schema

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  completed: Boolean,
  priority: String (enum: 'low', 'medium', 'high'),
  userId: ObjectId (reference to User),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Field Descriptions

| Field | Type | Description | Validation |
|-------|------|-------------|-----------|
| `_id` | ObjectId | MongoDB unique identifier | Auto-generated |
| `title` | String | Task name/title | Required, trimmed |
| `description` | String | Task details | Optional, trimmed |
| `completed` | Boolean | Task completion status | Default: false |
| `priority` | String | Task priority level | Enum: 'low', 'medium', 'high' |
| `userId` | ObjectId | Reference to owning user | Required, indexed |
| `createdAt` | Date | Task creation timestamp | Auto-generated |
| `updatedAt` | Date | Last modification timestamp | Auto-generated |

### Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "title": "Complete project documentation",
  "description": "Write comprehensive docs for the task tracker app",
  "completed": false,
  "priority": "high",
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "createdAt": ISODate("2024-01-15T11:00:00Z"),
  "updatedAt": ISODate("2024-01-15T11:00:00Z")
}
```

### Indexes

```javascript
// Compound index for faster queries
db.tasks.createIndex({ userId: 1, createdAt: -1 })

// This allows fast queries like:
// Find all tasks for user, sorted by creation date (newest first)
```

---

## API Data Flow

### User Registration

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Processing:**
1. Validate email format and password strength
2. Check if email already exists
3. Hash password with bcrypt
4. Create user document
5. Generate JWT token
6. Return token and user info

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Create Task

**Request (with JWT token):**
```json
{
  "title": "Complete project",
  "description": "Finish the task tracker app",
  "priority": "high"
}
```

**Processing:**
1. Verify JWT token validity
2. Extract userId from token
3. Validate task data
4. Create task document with userId
5. Return created task

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the task tracker app",
    "completed": false,
    "priority": "high",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

---

## Database Queries

### Get User by Email (for login)

```javascript
db.users.findOne({ email: "john@example.com" })
```

### Get All Tasks for User

```javascript
db.tasks.find({ userId: ObjectId("507f1f77bcf86cd799439011") })
         .sort({ createdAt: -1 })
```

### Get High Priority Tasks

```javascript
db.tasks.find({
  userId: ObjectId("507f1f77bcf86cd799439011"),
  priority: "high"
})
```

### Get Incomplete Tasks

```javascript
db.tasks.find({
  userId: ObjectId("507f1f77bcf86cd799439011"),
  completed: false
})
```

### Update Task Status

```javascript
db.tasks.updateOne(
  { _id: ObjectId("507f1f77bcf86cd799439012") },
  { $set: { completed: true, updatedAt: new Date() } }
)
```

### Delete Task

```javascript
db.tasks.deleteOne({ _id: ObjectId("507f1f77bcf86cd799439012") })
```

---

## MongoDB Atlas Setup

### Step-by-Step

1. **Create Cluster**
   - Go to mongodb.com/cloud/atlas
   - Create free tier cluster
   - Choose region closest to you
   - Wait for cluster creation (5-10 minutes)

2. **Create Database User**
   - Go to Database Access
   - Create user with username and password
   - Note these credentials for .env file

3. **Add IP Whitelist**
   - Go to Network Access
   - Add IP Address: 0.0.0.0/0 (or your specific IP)
   - This allows your app to connect

4. **Get Connection String**
   - Go to Databases → Connect
   - Choose "Drivers"
   - Copy connection string
   - Replace `<username>`, `<password>`, and `<dbname>`

### Connection String Format

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Example

```
mongodb+srv://taskuser:MyPassword123@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority
```

---

## Migrations & Backups

### Export Data

```bash
# Export users collection
mongoexport --uri "mongodb+srv://username:password@cluster.mongodb.net/task-tracker" \
  --collection users \
  --out users.json

# Export tasks collection
mongoexport --uri "mongodb+srv://username:password@cluster.mongodb.net/task-tracker" \
  --collection tasks \
  --out tasks.json
```

### Import Data

```bash
# Import users collection
mongoimport --uri "mongodb+srv://username:password@cluster.mongodb.net/task-tracker" \
  --collection users \
  --file users.json

# Import tasks collection
mongoimport --uri "mongodb+srv://username:password@cluster.mongodb.net/task-tracker" \
  --collection tasks \
  --file tasks.json
```

---

## Performance Optimization

### Indexes Created Automatically

The application creates these indexes:

1. **users.email** (unique)
   - Speeds up email lookups during login
   - Prevents duplicate registrations

2. **tasks.userId + createdAt** (compound)
   - Optimizes queries for user's tasks
   - Sorts by creation date efficiently

### Query Optimization Tips

1. **Always include userId filter for tasks**
   ```javascript
   // Good ✅
   db.tasks.find({ userId: userIdHere })
   
   // Bad ❌
   db.tasks.find({})
   ```

2. **Use indexes for frequent queries**
   - Email lookup on login
   - Task list retrieval
   - Priority filtering

3. **Limit fields returned**
   ```javascript
   db.tasks.find(
     { userId: userIdHere },
     { title: 1, completed: 1 } // Only get these fields
   )
   ```

---

## Data Validation Rules

### User Document

- **name**: 
  - Type: String
  - Required: Yes
  - Min length: 1
  - Trimmed: Yes

- **email**:
  - Type: String
  - Required: Yes
  - Unique: Yes
  - Format: `name@domain.com`
  - Lowercase: Yes

- **password**:
  - Type: String
  - Required: Yes
  - Min length: 6
  - Hashed: Yes (bcrypt)

### Task Document

- **title**:
  - Type: String
  - Required: Yes
  - Min length: 1
  - Trimmed: Yes

- **description**:
  - Type: String
  - Required: No
  - Default: ""
  - Trimmed: Yes

- **completed**:
  - Type: Boolean
  - Required: No
  - Default: false

- **priority**:
  - Type: String
  - Enum: ['low', 'medium', 'high']
  - Default: 'medium'

- **userId**:
  - Type: ObjectId
  - Required: Yes
  - Reference: users._id

---

## Troubleshooting

### Cannot Connect to MongoDB

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solutions**:
1. Check MongoDB URI in .env file
2. Verify MongoDB Atlas cluster is running
3. Check IP whitelist includes your machine's IP
4. Verify username/password in connection string

### Duplicate Key Error

**Error**: `E11000 duplicate key error`

**Cause**: Email already exists in database

**Solution**: Register with different email

### No Documents Found

**Query returns empty array**:
1. Check if userId is correct
2. Verify user has created tasks
3. Check completed filter if applied
4. Review MongoDB logs in Atlas

---

## Best Practices

1. ✅ Always validate user input before querying
2. ✅ Use prepared statements (Mongoose handles this)
3. ✅ Hash passwords with bcrypt
4. ✅ Index frequently queried fields
5. ✅ Keep sensitive data encrypted
6. ✅ Use transactions for multi-step operations
7. ✅ Backup data regularly
8. ✅ Monitor query performance

---

**For more information, visit the [MongoDB Documentation](https://docs.mongodb.com)**
