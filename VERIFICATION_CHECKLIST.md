# Installation & Verification Checklist

Complete this checklist to ensure everything is properly set up before running the app.

---

## Prerequisites Verification

### System Requirements
- [ ] Node.js version 16+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] 5GB free disk space available
- [ ] Stable internet connection

### Required Accounts
- [ ] MongoDB Atlas account created (free tier)
- [ ] MongoDB cluster deployed and ready
- [ ] Database user created with password
- [ ] IP whitelist configured (allow 0.0.0.0/0 for development)

---

## Backend Setup Verification

### Installation
```bash
cd backend
npm install
```
- [ ] No installation errors
- [ ] node_modules directory created
- [ ] All dependencies listed in output

### Configuration
- [ ] `.env` file exists in `backend/` folder
- [ ] `MONGODB_URI` contains correct connection string
- [ ] `JWT_SECRET` set to a random string
- [ ] `PORT` set to 5000
- [ ] `NODE_ENV` set to development

### Verify Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/task-tracker?retryWrites=true&w=majority
```
- [ ] Username is URL-encoded if it contains special characters
- [ ] Password is URL-encoded if it contains special characters
- [ ] Cluster name matches your MongoDB Atlas cluster
- [ ] Database name is `task-tracker`

### Start Server
```bash
npm run dev
```

Expected output:
```
✓ Connected to MongoDB
✓ Server running on http://localhost:5000
✓ API endpoint: http://localhost:5000/api
```

- [ ] No errors in console
- [ ] Server running message appears
- [ ] MongoDB connection successful
- [ ] Listening on port 5000

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "message": "Server is running"
}
```

- [ ] Response code is 200
- [ ] Message appears in response
- [ ] No connection errors

---

## Frontend Setup Verification

### Installation
```bash
cd mobile
npm install
```
- [ ] No installation errors
- [ ] node_modules directory created
- [ ] All dependencies installed

### Configuration

#### Find Your Machine's IP Address

**macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address"
```

- [ ] IP address identified (e.g., 192.168.1.100)
- [ ] IP matches your actual network IP

#### Update API Base URL

Edit `mobile/services/api.ts`:

```typescript
const API_BASE_URL = 'http://192.168.1.100:5000/api';
// ↑ Replace with your actual IP
```

- [ ] API_BASE_URL updated with your IP
- [ ] IP matches your machine's actual IP
- [ ] Port is 5000
- [ ] URL starts with http:// (not https://)

### Verify Files
- [ ] `mobile/App.tsx` exists
- [ ] `mobile/services/api.ts` exists
- [ ] `mobile/services/queries.ts` exists
- [ ] `mobile/screens/LoginScreen.tsx` exists
- [ ] `mobile/screens/SignupScreen.tsx` exists
- [ ] `mobile/screens/HomeScreen.tsx` exists
- [ ] `mobile/app.json` exists
- [ ] `mobile/tsconfig.json` exists
- [ ] `mobile/babel.config.js` exists

### Start Development Server
```bash
npm start
```

Expected output:
```
Expo DevTools is running at...
Tunnel ready.
Android developers can use Expo Go...
```

- [ ] No errors in console
- [ ] Dev server started successfully
- [ ] QR code displayed
- [ ] Metro bundler running

---

## Connectivity Verification

### Same WiFi Network
- [ ] Phone and computer connected to same WiFi
- [ ] WiFi network name visible on both devices
- [ ] Both devices have internet connectivity

### Firewall Configuration
```bash
# Check if port 5000 is listening
# macOS/Linux:
lsof -i :5000

# Windows:
netstat -ano | findstr :5000
```

- [ ] Port 5000 is listening
- [ ] Firewall not blocking port 5000
- [ ] Network connection allowed for Node.js

### Network Testing

From mobile app terminal (scan QR code and run):
```bash
# Inside Expo Go app, test connection
curl http://YOUR_IP:5000/api/health
```

- [ ] Health endpoint responds
- [ ] No connection timeout
- [ ] Response code 200

---

## Database Verification

### MongoDB Atlas
- [ ] Cluster is running (green status)
- [ ] Database user created
- [ ] IP whitelist includes your IP or 0.0.0.0/0
- [ ] Connection string is correct

### Connection Test

From backend directory:
```bash
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('✓ MongoDB connected')).catch(err => console.error('✗ Error:', err.message))"
```

- [ ] "✓ MongoDB connected" message appears
- [ ] No connection timeout
- [ ] No authentication errors

### Collections Created
After first signup, verify in MongoDB Atlas:
- [ ] `users` collection created
- [ ] `tasks` collection created
- [ ] At least one user document exists
- [ ] Indexes created automatically

---

## Mobile App Verification

### Install Expo Go App
- [ ] Expo Go app installed from app store
- [ ] App opens without errors
- [ ] Logged in to Expo account (optional but recommended)

### Test App in Expo Go
```
1. Run "npm start" in mobile directory
2. Open Expo Go app on phone
3. Scan QR code
4. Wait for app to load
```

- [ ] App loads without errors
- [ ] App doesn't show white/blank screen
- [ ] Navigation works
- [ ] No console errors

### Test Authentication
```
1. On LoginScreen → Click "Sign up"
2. Create account: name, email, password
3. Login with created credentials
4. Verify token saved (check AsyncStorage)
```

- [ ] Signup succeeds
- [ ] Login succeeds
- [ ] Navigation to HomeScreen occurs
- [ ] No authentication errors

### Test Task Management
```
1. On HomeScreen, click + button
2. Enter "Test Task" as title
3. Select "High" priority
4. Click "Create Task"
5. Verify task appears in list
6. Check task as complete
7. Delete task
```

- [ ] Task created successfully
- [ ] Task appears in list
- [ ] Task completion toggles
- [ ] Task deletion works
- [ ] Pull-to-refresh loads tasks

---

## API Testing Verification

### Test with curl

#### Health Check
```bash
curl http://localhost:5000/api/health
```
- [ ] Response: `{"message":"Server is running"}`
- [ ] Status: 200

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "password":"password123",
    "confirmPassword":"password123"
  }'
```
- [ ] Status: 201
- [ ] Response includes `token`
- [ ] Response includes `user` object

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
- [ ] Status: 200
- [ ] Response includes `token`
- [ ] Token is valid JWT format

#### Get Tasks
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
- [ ] Status: 200
- [ ] Response includes `tasks` array
- [ ] No authentication errors

#### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Task","priority":"high"}'
```
- [ ] Status: 201
- [ ] Response includes created task
- [ ] Task has correct title and priority

---

## TypeScript Verification

### Type Checking
```bash
cd mobile
npm run type-check  # If available
# Or just check compilation
```

- [ ] No TypeScript errors
- [ ] All type definitions resolved
- [ ] No `any` type warnings (optional)

### Files Checked
- [ ] `mobile/types/index.ts` has proper exports
- [ ] `mobile/services/api.ts` properly typed
- [ ] `mobile/services/queries.ts` properly typed
- [ ] `mobile/screens/*.tsx` properly typed

---

## Performance Verification

### Backend Performance
- [ ] Server starts in < 5 seconds
- [ ] Health check responds in < 100ms
- [ ] Login responds in < 500ms
- [ ] Create task responds in < 600ms

### Frontend Performance
- [ ] App starts in < 10 seconds
- [ ] Screen transitions are smooth (60fps)
- [ ] Task list renders without lag
- [ ] No memory leaks after navigation

### Database Performance
- [ ] MongoDB queries complete in < 300ms
- [ ] No timeout errors
- [ ] Indexes are being used effectively

---

## Security Verification

### Backend Security
- [ ] `.env` file is in `.gitignore`
- [ ] `JWT_SECRET` is strong (random string)
- [ ] Passwords are hashed with bcrypt
- [ ] No secrets in code files

### Frontend Security
- [ ] Token stored in AsyncStorage (not localStorage)
- [ ] No sensitive data logged to console
- [ ] API URL doesn't expose credentials
- [ ] Authorization header properly sent

### Database Security
- [ ] MongoDB user has limited permissions
- [ ] IP whitelist configured (not 0.0.0.0/0 in production)
- [ ] Unique index on user email
- [ ] No exposed connection strings

---

## Common Issues & Fixes

### Issue: "Cannot reach API"
- [ ] Check backend is running: `npm run dev`
- [ ] Check API_BASE_URL matches your IP
- [ ] Check phone and computer on same WiFi
- [ ] Check firewall allows port 5000

### Issue: "MongoDB connection failed"
- [ ] Check .env has correct connection string
- [ ] Check password in connection string is URL-encoded
- [ ] Check cluster is running in MongoDB Atlas
- [ ] Check IP whitelist includes your IP

### Issue: "White/blank screen in app"
- [ ] Check console logs: `npm start -- --clear`
- [ ] Verify API_BASE_URL is correct
- [ ] Check backend is running and healthy
- [ ] Check AsyncStorage for token corruption

### Issue: "Token invalid/expired"
- [ ] Clear AsyncStorage: uninstall Expo Go
- [ ] Login again to get fresh token
- [ ] Check JWT_SECRET hasn't changed
- [ ] Check server time is synchronized

### Issue: "EADDRINUSE: Port 5000 in use"
```bash
# macOS/Linux:
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## Final Verification Summary

### All Checks Passed?
- [ ] System requirements met
- [ ] Backend installed and running
- [ ] Frontend installed and running
- [ ] Database connected
- [ ] Mobile app loads
- [ ] Authentication works
- [ ] API tests pass
- [ ] No errors in console

### Ready for Development?
- [ ] All items above checked
- [ ] Documentation reviewed
- [ ] Setup guide followed
- [ ] Test account created

---

## Next Steps

1. **Review Documentation**
   - Read README.md
   - Review API_TESTING_GUIDE.md
   - Check MONGODB_SCHEMA.md

2. **Develop Features**
   - Start with authentication
   - Implement task management
   - Add more UI polish

3. **Test Thoroughly**
   - Test on real device
   - Test all user flows
   - Check error handling

4. **Deploy**
   - Deploy backend to production
   - Build and distribute app
   - Monitor performance

---

**If all checks pass, you're ready to go! 🚀**

For issues not listed above, refer to the troubleshooting sections in README.md and SETUP_QUICK_START.md.
