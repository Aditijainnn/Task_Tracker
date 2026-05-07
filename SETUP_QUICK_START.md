# Quick Start Guide - Task Tracker App

### Step 1: Backend 

```bash
# 1. Navigate to backend
cd backend

# 2. Update .env file (open and edit)
# Add your MongoDB connection string from Atlas
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority

# 3. Install and run
npm install
npm run dev


```

### Step 2: Frontend (2 minutes)

```bash
# 1. In a new terminal, navigate to mobile
cd mobile

# 2. Update API_BASE_URL in services/api.ts
# Find your IP: ifconfig | grep "inet " | grep -v 127.0.0.1
# Example: http://192.168.1.100:5000/api

# 3. Install and run
npm install
npm start

# 4. On your phone:
# - Install Expo Go app
# - Scan QR code from terminal
# - App loads on your phone!
```

---

## Key Configuration Files

### Backend `.env`
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend API Base URL (mobile/services/api.ts)
```typescript
const API_BASE_URL = 'http://YOUR_LOCAL_IP:5000/api';
// Example: http://192.168.1.100:5000/api
```

---

## Test the App

### 1. Create Account
- Open app → Signup
- Email: `test@example.com`
- Password: `password123`

### 2. Create Tasks
- Click + button
- Add "Learn MongoDB"
- Set priority to "High"
- Click Create Task

### 3. Manage Tasks
- Check box to mark complete
- Click × to delete
- Pull down to refresh

---

##  Running on Phone vs Emulator

### Android Emulator
```bash
npm start
# Press 'a' in terminal
# Opens Android emulator with app
```

### iOS Simulator (Mac only)
```bash
npm start
# Press 'i' in terminal
# Opens iOS simulator with app
```

### Physical Phone
```bash
npm start
# Install Expo Go from app store
# Scan QR code in terminal with phone camera
```

---

##  Common Issues

| Issue | Solution |
|-------|----------|
| Cannot reach API | Check IP in api.ts matches your machine's IP |
| "MongoDB connection failed" | Verify connection string in .env file |
| "Port 5000 in use" | Kill process: `lsof -i :5000 \| kill -9` |
| Blank white screen | Check console logs: `npm start -- --clear` |
| Network timeout | Verify phone & computer on same WiFi |

---

## API Endpoints (Backend)

```bash
# Test health check
curl http://localhost:5000/api/health

# Create account
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123","confirmPassword":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get tasks (replace TOKEN)
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

---

## Folder Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── mobile/
    ├── screens/
    │   ├── LoginScreen.tsx
    │   ├── SignupScreen.tsx
    │   └── HomeScreen.tsx
    ├── services/
    │   ├── api.ts
    │   └── queries.ts
    ├── types/
    │   └── index.ts
    ├── App.tsx
    ├── app.json
    └── package.json
```

---

##  UI Features

✨ **3D Glassmorphic Design**
- Translucent cards with blur effects
- Gradient backgrounds
- Smooth animations
- Dark theme with vibrant accents
- Professional shadows for depth

---

## Deployment (Later)

### Backend → Render/Railway/Heroku
```bash
# After testing locally:
1. Update MongoDB whitelist (allow all IPs)
2. Set production environment variables
3. Deploy to chosen platform
4. Update API_BASE_URL to production URL
```

### Frontend → Expo / Build APK
```bash
# Build APK for Android
eas build --platform android

# Build IPA for iOS (Mac only)
eas build --platform ios
```

---

##  Features Implemented

-  User signup/login with JWT
-  Secure password hashing (bcrypt)
-  CRUD operations for tasks
-  Task priorities (Low/Medium/High)
-  Mark tasks complete/incomplete
-  Pull-to-refresh functionality
-  3D glassmorphic UI design
-  Dark theme with animations
-  TypeScript for type safety
-  TanStack Query for state management
-  Automatic token handling
-  Error handling and validation

---
