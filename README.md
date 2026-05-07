# Task Tracker App - Full Stack

A modern task management app built with React Native, Node.js, and MongoDB

## Project Structure

```
project-root/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── models/         # MongoDB models (User, Task)
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth middleware
│   │   └── index.js        # Main server file
│   ├── .env               # Environment variables
│   └── package.json
└── mobile/                 # React Native app
    ├── screens/           # App screens
    ├── services/          # API & Query services
    ├── types/            # TypeScript types
    ├── App.tsx           # Root component
    ├── app.json          # Expo config
    └── package.json
```

## Features

 **User Authentication**
- Signup with email validation
- Login with JWT tokens
- Token persistence with AsyncStorage
- Secure password hashing with bcrypt

 **Task Management**
- Create, read, update, and delete tasks
- Set task priority (low, medium, high)
- Mark tasks as complete/incomplete
- Pull-to-refresh functionality
- Real-time UI updates

 **3D UI Design**
- Glassmorphic design with blur effects
- Gradient backgrounds
- Smooth animations and transitions
- Dark theme with accent colors
- Professional shadows and depth

**State Management**
- TanStack Query (React Query) for data fetching
- Automatic cache invalidation
- Optimistic updates
- Error handling

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT (jsonwebtoken)
- **Password**: bcryptjs

### Frontend
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: TanStack Query
- **Navigation**: React Navigation
- **HTTP Client**: Axios
- **Storage**: AsyncStorage

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB Atlas Account** (Free tier available at mongodb.com/cloud/atlas)
3. **Expo CLI** - Install with `npm install -g expo-cli`
4. **Mobile Device or Emulator** (Android Studio or Xcode)

## Setup Instructions

### 1. Backend Setup

#### Step 1: Create MongoDB Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and log in
3. Create a new project and cluster (Free tier)
4. Create a database user with a password
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority`

#### Step 2: Configure Backend Environment
```bash
cd backend

# Update .env file with your MongoDB URI
# Replace the values in .env:
# MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# PORT=5000
```

#### Step 3: Install Dependencies & Start Server
```bash
# Install dependencies
npm install

# Start the server
npm run dev
```

You should see:
```
✓ Connected to MongoDB
✓ Server running on http://localhost:5000
✓ API endpoint: http://localhost:5000/api
```

### 2. Frontend Setup

#### Step 1: Install Dependencies
```bash
cd mobile

npm install
# or
yarn install
```

#### Step 2: Configure API URL
**IMPORTANT**: Update the API base URL in `mobile/services/api.ts`:

```typescript
// Find your machine's IP address:
// macOS/Linux: ifconfig | grep "inet " | grep -v 127.0.0.1
// Windows: ipconfig (look for IPv4 Address)

// Example: 192.168.1.100
const API_BASE_URL = 'http://192.168.1.100:5000/api'; // Change IP here
```

**Requirements**:
- Your phone and computer must be on the **same WiFi network**
- Use your machine's local IP address, NOT localhost
- Make sure the backend is running before starting the app

#### Step 3: Start Expo App
```bash
# Start the development server
npm start

# Then:
# - Press 'a' for Android emulator
# - Press 'i' for iOS simulator
# - Scan QR code with Expo Go app on your phone
```

## API Endpoints

### Authentication
```
POST   /api/auth/signup
POST   /api/auth/login
```

### Tasks (Protected - Requires Token)
```
GET    /api/tasks              # Get all user tasks
POST   /api/tasks              # Create new task
PUT    /api/tasks/:id          # Update task
DELETE /api/tasks/:id          # Delete task
```

## Testing with API Client

### Using Thunder Client (VS Code Extension)
1. Create new request
2. Set method to POST
3. URL: `http://localhost:5000/api/auth/login`
4. Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Request Example
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Tasks (with Auth)
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Backend Issues

**"Cannot find module 'mongoose'"**
```bash
cd backend
npm install
```

**"MongoDB connection failed"**
- Check your connection string in `.env`
- Verify MongoDB Atlas IP whitelist includes your IP
- Check username/password in connection string

**"Port 5000 already in use"**
```bash
# macOS/Linux:
lsof -i :5000
kill -9 <PID>

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Issues

**"Cannot reach backend API"**
- Verify backend is running: `http://localhost:5000/api/health`
- Check your IP address in `api.ts` matches your machine's IP
- Ensure phone and computer are on same WiFi
- Check firewall isn't blocking port 5000

**"Module not found errors"**
```bash
cd mobile
npm install
rm -rf node_modules/.bin
npm start
```

**Expo connection issues**
- Make sure you're logged in: `expo login`
- Try clearing cache: `npm start -- --clear`
- Restart Expo server

## Project Walkthrough

### Backend Flow
1. **User Registration** → Password hashed with bcrypt → Stored in MongoDB
2. **User Login** → Password verified → JWT token generated → Token sent to client
3. **Task Operations** → Middleware validates token → Controller processes request → Response sent

### Frontend Flow
1. **App Launch** → Check AsyncStorage for token → Navigate to Login or Home
2. **Login/Signup** → Submit credentials → Store token in AsyncStorage → Navigate to Home
3. **Home Screen** → TanStack Query fetches tasks → Display task list
4. **Create Task** → Form validation → Mutation submits to API → Query invalidated → List refreshes
5. **Update/Delete** → Optimistic update → API request → Revalidate on success

### 3D UI Features
- **Glassmorphic Cards**: Semi-transparent backgrounds with blur effects
- **Dark Theme**: #0f0f2e background with vibrant accents
- **Gradients**: Subtle color transitions
- **Shadows**: Layered depth effect
- **Animations**: Smooth transitions between screens and states

## Security Notes

⚠️ **Production Checklist**
- Change `JWT_SECRET` to a strong random string
- Enable MongoDB Atlas IP whitelist
- Use HTTPS in production
- Store sensitive data securely
- Implement rate limiting
- Add input validation on frontend & backend
- Use environment variables for all secrets

## Next Steps

1. ✅ Complete all required features from the task document
2. ✅ Test all CRUD operations
3. ✅ Deploy backend to Render, Railway, or Heroku
4. ✅ Deploy frontend to Expo or build APK/IPA
5. ✅ Update production API URL
6. ✅ Monitor error logs with Sentry

## Files Summary

### Backend (9 files)
- `backend/src/index.js` - Express server configuration
- `backend/src/models/User.js` - User schema with password hashing
- `backend/src/models/Task.js` - Task schema with user reference
- `backend/src/controllers/authController.js` - Signup/login logic
- `backend/src/controllers/taskController.js` - Task CRUD operations
- `backend/src/routes/authRoutes.js` - Auth endpoints
- `backend/src/routes/taskRoutes.js` - Task endpoints
- `backend/src/middleware/authMiddleware.js` - JWT verification
- `backend/.env` - Environment configuration

### Frontend (7+ files)
- `mobile/App.tsx` - Root component with navigation & query provider
- `mobile/screens/LoginScreen.tsx` - Login form with 3D styling
- `mobile/screens/SignupScreen.tsx` - Signup form with validation
- `mobile/screens/HomeScreen.tsx` - Task list with CRUD operations
- `mobile/services/api.ts` - Axios instance with interceptors
- `mobile/services/queries.ts` - TanStack Query hooks
- `mobile/types/index.ts` - TypeScript type definitions
- `mobile/app.json` - Expo configuration

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review console logs for error messages
3. Verify backend is running and accessible
4. Check MongoDB connection string in `.env`
5. Ensure API URL is correct in `services/api.ts`

---
