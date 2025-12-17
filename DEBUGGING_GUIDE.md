# 🔧 Admin Dashboard Debugging Guide

## 🚨 Common Issues & Solutions

### Issue 1: "Failed to load overview data"

#### Symptoms:
- Frontend shows error message
- Browser console shows API errors
- Network tab shows failed requests

#### Debugging Steps:

1. **Check Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   - Verify server starts without errors
   - Check console for MongoDB connection
   - Look for route registration messages

2. **Check API Endpoint**
   - Open browser DevTools → Network tab
   - Navigate to `/admin`
   - Look for request to `/api/admin/overview`
   - Check request status:
     - **200 OK** → Data issue
     - **401 Unauthorized** → Token issue
     - **403 Forbidden** → Role issue
     - **404 Not Found** → Route issue
     - **500 Server Error** → Backend error

3. **Verify JWT Token**
   ```javascript
   // In browser console:
   localStorage.getItem('token')
   ```
   - Should return a JWT token string
   - If `null`, user needs to login

4. **Check User Role**
   ```javascript
   // In MongoDB shell:
   db.users.findOne({ email: "your-email@example.com" })
   ```
   - Verify `role: "admin"`
   - Verify `status: "active"`

5. **Check Backend Logs**
   - Look for `[Admin Overview]` logs
   - Check for MongoDB errors
   - Verify aggregation queries

---

### Issue 2: "403 Forbidden" Error

#### Cause:
User doesn't have admin role

#### Solution:

1. **Update User Role in MongoDB**
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin", status: "active" } }
   )
   ```

2. **Logout and Login Again**
   - Clear browser localStorage
   - Login with admin account
   - New JWT token will include admin role

3. **Verify Token Contains Role**
   - Decode JWT at [jwt.io](https://jwt.io)
   - Check payload contains role

---

### Issue 3: Empty Data / No Charts

#### Symptoms:
- Cards show 0 values
- Charts are empty
- No error messages

#### Debugging Steps:

1. **Check MongoDB Collections**
   ```javascript
   // In MongoDB shell:
   db.users.countDocuments()        // Should be > 0
   db.posts.countDocuments()        // Should be > 0
   db.aichats.countDocuments()      // Should be > 0
   db.bmirecords.countDocuments()   // Should be > 0
   ```

2. **Test API Directly**
   ```bash
   # Using curl (replace YOUR_TOKEN):
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        http://localhost:5000/api/admin/overview
   ```

3. **Check Backend Console**
   - Look for `[Admin Overview]` logs
   - Check aggregation results
   - Verify date calculations

---

### Issue 4: CORS Errors

#### Symptoms:
- Browser console shows CORS errors
- Requests fail with CORS policy

#### Solution:

1. **Verify Backend CORS Config**
   ```javascript
   // backend/server.js should have:
   app.use(cors());
   ```

2. **Check Frontend API Base URL**
   ```env
   # frontend/.env
   VITE_API_BASE=http://localhost:5000/api
   ```

3. **Restart Both Servers**
   - Stop backend and frontend
   - Start backend first
   - Then start frontend

---

## 🧪 Testing with Postman

### Step 1: Get JWT Token

1. **Login Endpoint**
   ```
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json
   
   {
     "email": "admin@example.com",
     "password": "yourpassword"
   }
   ```

2. **Copy Token from Response**
   ```json
   {
     "user": { ... },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```

### Step 2: Test Admin Overview

1. **Set Authorization Header**
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

2. **Make Request**
   ```
   GET http://localhost:5000/api/admin/overview
   ```

3. **Expected Response**
   ```json
   {
     "totalUsers": 10,
     "activeUsers": 5,
     "totalForumPosts": 25,
     "totalAiChats": 15,
     "averageBMI": 23.5
   }
   ```

### Step 3: Test Other Endpoints

```
GET /api/admin/user-analytics?period=7
GET /api/admin/wellness-trends
GET /api/admin/forum-analytics?period=7
GET /api/admin/ai-analytics?period=7
```

---

## 📊 MongoDB Sample Data

### Create Test Users
```javascript
db.users.insertMany([
  {
    name: "Admin User",
    email: "admin@test.com",
    password: "$2a$10$hashed_password",
    role: "admin",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Regular User",
    email: "user@test.com",
    password: "$2a$10$hashed_password",
    role: "user",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
```

### Create Test Posts
```javascript
db.posts.insertMany([
  {
    author: ObjectId("user_id_here"),
    title: "Test Post 1",
    content: "Content here",
    tags: ["health", "wellness"],
    likes: 5,
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
```

### Create Test BMI Records
```javascript
db.bmirecords.insertMany([
  {
    user: ObjectId("user_id_here"),
    heightCm: 170,
    weightKg: 70,
    bmi: 24.2,
    category: "normal",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
```

---

## 🔍 Console Logging

### Backend Logs to Watch:

```
[Auth Middleware] Authenticated user: admin@example.com Role: admin
[Admin Middleware] Admin access granted for: admin@example.com
[Admin Overview] Request received from user: admin@example.com
[Admin Overview] Calculating metrics...
[Admin Overview] Response: { totalUsers: 10, ... }
```

### Frontend Logs to Watch:

```
[API] Request to: /admin/overview with token: eyJhbGciOiJIUzI1NiIs...
[Admin API] Fetching overview data...
[Admin API] Overview data received: { totalUsers: 10, ... }
[Dashboard] Fetching all data...
```

---

## ✅ Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] MongoDB connected and accessible
- [ ] User has `role: "admin"` in database
- [ ] JWT token exists in localStorage
- [ ] API base URL correct in frontend `.env`
- [ ] CORS enabled in backend
- [ ] Network requests show 200 status
- [ ] Console shows no errors
- [ ] Data appears in response

---

## 🆘 Still Having Issues?

1. **Clear Browser Cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. **Check Network Tab**
   - Open DevTools → Network
   - Filter by "XHR"
   - Check request/response details

3. **Verify Environment Variables**
   ```bash
   # Backend
   echo $MONGODB_URI
   echo $JWT_SECRET
   
   # Frontend
   echo $VITE_API_BASE
   ```

4. **Restart Everything**
   ```bash
   # Stop all processes
   # Clear node_modules and reinstall
   npm install
   # Restart servers
   ```

---

## 📞 Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/

# Test MongoDB connection (in backend directory)
node -e "require('./config/db.js').default().then(() => console.log('Connected'))"

# Check if port is in use
netstat -an | grep 5000  # Windows
lsof -i :5000            # Mac/Linux
```

