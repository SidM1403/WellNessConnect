# 🚀 Admin Dashboard - Setup & Run Instructions

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Create/update `.env` file in `backend/` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/wellconnect
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellconnect

# JWT Secret (use a strong secret in production)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Server Port
PORT=5000

# Optional: Hugging Face API for AI features
HUGGINGFACE_API_KEY=your_key_here
```

### Step 4: Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected
```

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Create/update `.env` file in `frontend/` directory:

```env
VITE_API_BASE=http://localhost:5000/api
```

### Step 4: Start Frontend Server
```bash
npm run dev
```

**Expected Output:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 👤 Create Admin Account

### Method 1: Update Existing User (Recommended)

1. **Register a regular account** through the signup page at `http://localhost:5173/signup`

2. **Open MongoDB Compass** or MongoDB shell

3. **Find and update the user:**
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin", status: "active" } }
   )
   ```

4. **Logout and login again** with that account

### Method 2: Direct Database Insert

```javascript
// In MongoDB shell
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$hashed_password_here", // Use bcrypt to hash
  role: "admin",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Note:** For Method 2, you need to hash the password. It's easier to use Method 1.

---

## 🧪 Test Admin Overview API

### Using Postman or curl:

1. **First, login to get token:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"yourpassword"}'
   ```

2. **Copy the token from response**

3. **Test overview endpoint:**
   ```bash
   curl -X GET http://localhost:5000/api/admin/overview \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

**Expected Response:**
```json
{
  "totalUsers": 10,
  "activeUsers": 5,
  "totalForumPosts": 25,
  "totalAiChats": 15,
  "averageBMI": 23.5
}
```

---

## 🔐 Verify Admin Role

### Check in MongoDB:
```javascript
db.users.findOne({ email: "your-email@example.com" })
```

**Should show:**
```json
{
  "role": "admin",
  "status": "active"
}
```

### Check JWT Token:
1. Copy token from localStorage: `localStorage.getItem('token')`
2. Decode at [jwt.io](https://jwt.io)
3. Verify payload contains role

---

## 🚨 Common Reasons Overview Fails to Load

### 1. **Backend Not Running**
- **Symptom:** Network error, connection refused
- **Solution:** Start backend with `npm run dev` in `backend/` directory

### 2. **MongoDB Not Connected**
- **Symptom:** Backend crashes or shows connection error
- **Solution:** 
  - Check `MONGODB_URI` in `.env`
  - Verify MongoDB is running
  - Test connection string

### 3. **User Not Admin**
- **Symptom:** 403 Forbidden error
- **Solution:** Update user role in MongoDB to `"admin"`

### 4. **No JWT Token**
- **Symptom:** 401 Unauthorized error
- **Solution:** Login first to get token

### 5. **Wrong API Base URL**
- **Symptom:** 404 Not Found or CORS errors
- **Solution:** Check `VITE_API_BASE` in frontend `.env`

### 6. **Empty Database**
- **Symptom:** All values show 0
- **Solution:** Add test data to MongoDB collections

### 7. **CORS Issues**
- **Symptom:** CORS policy errors in browser
- **Solution:** Verify `app.use(cors())` in `backend/server.js`

---

## 📊 Verify Data Flow

### Backend Console Should Show:
```
[Auth Middleware] Authenticated user: admin@example.com Role: admin
[Admin Middleware] Admin access granted for: admin@example.com
[Admin Overview] Request received from user: admin@example.com
[Admin Overview] Calculating metrics...
[Admin Overview] Response: { totalUsers: 10, activeUsers: 5, ... }
```

### Frontend Console Should Show:
```
[API] Request to: /admin/overview with token: eyJhbGciOiJIUzI1NiIs...
[Admin API] Fetching overview data...
[Admin API] Overview data received: { totalUsers: 10, ... }
[Dashboard] Fetching all data...
```

### Browser Network Tab Should Show:
- Request to `/api/admin/overview`
- Status: `200 OK`
- Response with JSON data

---

## 🎯 Access Admin Dashboard

1. **Start both servers:**
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:5173`

2. **Login as admin:**
   - Go to: `http://localhost:5173/login`
   - Enter admin credentials

3. **Access dashboard:**
   - Navigate to: `http://localhost:5173/admin`
   - Or click admin link in navigation

---

## 📁 File Structure

```
backend/
  ├── controllers/
  │   └── adminController.js    ✅ Fixed overview endpoint
  ├── routes/
  │   └── adminRoutes.js        ✅ Protected routes
  ├── middleware/
  │   └── authMiddleware.js     ✅ Enhanced logging
  └── server.js                 ✅ CORS enabled

frontend/
  ├── src/
  │   ├── pages/admin/
  │   │   ├── Dashboard.jsx     ✅ New professional UI
  │   │   ├── OverviewCards.jsx ✅ Minimal cards
  │   │   └── Charts.jsx         ✅ Professional charts
  │   ├── services/
  │   │   └── adminApi.js        ✅ Clean API service
  │   └── api/
  │       └── api.js             ✅ Enhanced error handling
```

---

## ✅ Quick Verification Checklist

- [ ] Backend server running (`npm run dev` in `backend/`)
- [ ] Frontend server running (`npm run dev` in `frontend/`)
- [ ] MongoDB connected (check backend console)
- [ ] Admin account created (role: "admin" in database)
- [ ] Logged in as admin user
- [ ] Token exists in localStorage
- [ ] Can access `/admin` route
- [ ] Overview cards show data (not 0s)
- [ ] Charts render properly
- [ ] No console errors

---

## 🐛 Debugging

If issues persist:

1. **Check browser console** for errors
2. **Check backend console** for logs
3. **Check Network tab** for failed requests
4. **See `DEBUGGING_GUIDE.md`** for detailed troubleshooting
5. **Test API with Postman** (see guide above)

---

## 🎉 Success Indicators

When everything works correctly:

✅ Dashboard loads without errors  
✅ Overview cards show real numbers  
✅ Charts display data  
✅ No "Failed to load" messages  
✅ Professional, minimal UI  
✅ Responsive design works  
✅ All API calls return 200 status  

---

**Need help?** Check `DEBUGGING_GUIDE.md` for detailed troubleshooting steps.

