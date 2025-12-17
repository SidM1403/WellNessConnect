# Admin Analytics Dashboard - Setup & Access Guide

## 🎯 Overview

This document provides complete instructions for setting up and accessing the **Admin Analytics Dashboard** for your Health and Wellness Community platform.

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

---

## 🚀 Setup Instructions

### 1. Backend Setup

#### Step 1: Navigate to Backend Directory
```bash
cd backend
```

#### Step 2: Install Dependencies (if not already installed)
```bash
npm install
```

#### Step 3: Environment Variables Setup

Create or update `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/wellconnect
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellconnect

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Server Port
PORT=5000

# Hugging Face API (for AI features - optional)
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

#### Step 4: Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

The backend server will run on `http://localhost:5000`

---

### 2. Frontend Setup

#### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 2: Install Dependencies (if not already installed)
```bash
npm install
```

#### Step 3: Environment Variables Setup

Create or update `.env` file in the `frontend` directory:

```env
VITE_API_BASE=http://localhost:5000/api
```

#### Step 4: Start Frontend Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

---

### 3. MongoDB Connection

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```
3. Update `MONGODB_URI` in backend `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/wellconnect
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellconnect
   ```

---

## 👤 Creating an Admin Account

### Method 1: Using MongoDB Shell/Compass

1. Connect to your MongoDB database
2. Navigate to the `users` collection
3. Find a user document or create a new one
4. Update the `role` field to `"admin"`:

```javascript
// In MongoDB shell
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin", status: "active" } }
)
```

### Method 2: Using the Application

1. Register a new account through the signup page
2. Use MongoDB to update that user's role to `"admin"` (as shown in Method 1)
3. Log in with that account

### Method 3: Direct Database Insert (for first admin)

```javascript
// In MongoDB shell
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$hashed_password_here", // Use bcrypt to hash password
  role: "admin",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Note:** For Method 3, you'll need to hash the password using bcrypt. It's easier to use Method 1 or 2.

---

## 🔐 Accessing the Admin Dashboard

### Step 1: Login as Admin

1. Open your browser and navigate to: `http://localhost:5173/login`
2. Enter your admin account credentials (email and password)
3. Click "Login"

### Step 2: Access Admin Dashboard

Once logged in as an admin user, you can access the dashboard in two ways:

#### Option A: Direct URL
Navigate directly to:
```
http://localhost:5173/admin
```

#### Option B: Through Navigation
- If your Navbar has an admin link, click it
- Or manually type `/admin` in the URL

---

## 📊 Admin Dashboard Features

### 1. **Overview Page** (`/admin`)
- Total registered users
- Active users (last 7 days)
- Total forum posts
- Total AI chatbot interactions
- Average BMI across users

### 2. **User Analytics** (`/admin/users`)
- Daily Active Users (DAU) - Line chart
- Weekly Active Users (WAU) - Bar chart
- New user registrations per day
- Login activity trends
- Time period filter (7/30/90 days)

### 3. **Wellness Trends** (`/admin/wellness`)
- Average sleep hours
- Stress level distribution
- BMI category distribution (pie chart)
- Most logged symptoms (bar chart)
- All data is aggregated and anonymous

### 4. **Forum Analytics** (`/admin/forums`)
- Total forum threads
- Most active discussion topics
- Posts per day (line chart)
- Reported posts count
- Admin actions: Delete reported posts

### 5. **AI Analytics** (`/admin/ai`)
- Total AI chats
- Queries per day
- Most common health topics searched
- Error/fallback responses count
- Usage by mode (fitness/health)

### 6. **User Management** (`/admin/manage`)
- View all users with pagination
- Search users by email or name
- Change user role (user ↔ admin)
- Suspend or activate accounts
- Real-time updates

---

## 🛡️ Security Features

### Role-Based Access Control (RBAC)
- ✅ All admin routes are protected with JWT authentication
- ✅ Admin-only middleware ensures only `role: "admin"` users can access
- ✅ Unauthorized users receive `403 Forbidden` response
- ✅ Frontend routes are protected with `AdminRoute` component

### API Endpoints Protection
All admin endpoints require:
1. Valid JWT token in `Authorization: Bearer <token>` header
2. User role must be `"admin"`

---

## 📡 API Endpoints

### Overview
- `GET /api/admin/overview` - Dashboard summary

### Analytics
- `GET /api/admin/user-analytics?period=7` - User engagement data
- `GET /api/admin/wellness-trends` - Wellness insights
- `GET /api/admin/forum-analytics?period=7` - Forum statistics
- `GET /api/admin/ai-analytics?period=7` - AI usage metrics

### User Management
- `GET /api/admin/users?search=&page=1&limit=50` - List all users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/status` - Suspend/activate user

### Forum Management
- `GET /api/admin/posts` - List all posts
- `GET /api/admin/posts/reported` - Get reported posts
- `DELETE /api/admin/posts/:id` - Delete post

---

## 🐛 Troubleshooting

### Issue: "403 Forbidden" when accessing admin routes
**Solution:**
- Ensure your user account has `role: "admin"` in the database
- Check that you're logged in with a valid JWT token
- Verify the token hasn't expired

### Issue: "Cannot connect to API"
**Solution:**
- Ensure backend server is running on port 5000
- Check `VITE_API_BASE` in frontend `.env`
- Verify CORS is enabled in backend

### Issue: "No data showing in charts"
**Solution:**
- Ensure MongoDB has data in collections:
  - `users`
  - `posts`
  - `aichats`
  - `dailyhealthlogs`
  - `bmirecords`
  - `symptomlogs`
- Check browser console for API errors
- Verify backend endpoints are returning data

### Issue: Charts not rendering
**Solution:**
- Ensure `recharts` is installed: `npm install recharts` in frontend
- Check browser console for errors
- Verify data format matches chart expectations

---

## 📝 Database Collections Used

The admin dashboard queries these MongoDB collections:

1. **users** - User accounts and roles
2. **posts** - Forum posts and threads
3. **aichats** - AI assistant conversations
4. **dailyhealthlogs** - Daily health tracking data
5. **bmirecords** - BMI calculations
6. **symptomlogs** - Symptom tracking
7. **sessions** - User login sessions (optional)

---

## 🎨 UI Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Theme** - Modern glassmorphism design
- **Interactive Charts** - Powered by Recharts
- **Real-time Data** - Fetches fresh data from MongoDB
- **Animated Counters** - Smooth number transitions
- **Sidebar Navigation** - Easy page switching
- **Search & Filter** - Find users quickly

---

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Use MongoDB Atlas or secure MongoDB instance
4. Deploy to Heroku, Railway, or similar

### Frontend
1. Build for production: `npm run build`
2. Deploy `dist` folder to Vercel, Netlify, or similar
3. Update `VITE_API_BASE` to production API URL

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Check backend server logs
3. Verify MongoDB connection
4. Ensure all environment variables are set correctly

---

## ✅ Quick Start Checklist

- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] MongoDB connected and running
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Admin account created
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 5173)
- [ ] Logged in as admin user
- [ ] Accessed `/admin` route successfully

---

**🎉 You're all set! Enjoy your Admin Analytics Dashboard!**

