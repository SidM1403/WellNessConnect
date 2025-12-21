# WellConnect - Health & Wellness Community Platform

A full-stack MERN application for an online health & wellness community with authentication, forums, resources, analytics dashboards, and admin moderation.

---

## 🚀 Tech Stack

- **Frontend**: React + Vite, Tailwind CSS, React Router, Axios, Recharts, Framer Motion
- **Backend**: Node.js, Express, MongoDB/Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Authorization**: Role-based access (user/admin)

---

## 📁 Project Structure

```
wellconnect/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, validation middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   └── server.js        # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── api/         # API client configuration
│   │   ├── components/  # Reusable React components
│   │   ├── context/     # React context (Auth)
│   │   ├── pages/       # Page components
│   │   └── services/    # API service functions
│   └── vite.config.js   # Vite configuration
└── README.md
```

---

## 🛠️ Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the example below and fill in your values
```

**backend/.env:**
```env
MONGO_URI=mongodb://localhost:27017/wellconnect
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NODE_ENV=development
PORT=5000
```

```bash
# Start development server
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🌐 Deployment

See **[DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md)** for detailed deployment guide.

**Quick Summary:**
- **Backend**: Deploy to Render.com or Railway.app
- **Frontend**: Deploy to Vercel
- **Database**: MongoDB Atlas (cloud)

---

## 🔐 Authentication & Authorization

### User Roles

- **User**: Regular member, can access dashboard, forum, resources
- **Admin**: Can access admin dashboard and manage users/posts

### Protected Routes

- User routes require authentication (JWT token)
- Admin routes require authentication + admin role

### Creating Admin User

1. Register a regular user through signup
2. In MongoDB, update user document:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin", status: "active" } }
   )
   ```
3. Logout and login again with that account

---

## 📊 Features

### User Features
- User authentication (login/signup)
- Personal dashboard with health tracking
- Forum posts and comments
- Health resources
- AI wellness assistant
- Mood tracking
- Symptom logging
- BMI calculator
- Wellness tasks

### Admin Features
- Admin analytics dashboard
- User management
- Forum moderation
- Analytics charts (user activity, registrations, wellness trends)
- Real-time data visualization

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Admin (Protected)
- `GET /api/admin/overview` - Dashboard overview stats
- `GET /api/admin/user-analytics` - User analytics data
- `GET /api/admin/forum-analytics` - Forum analytics data
- `GET /api/admin/wellness-trends` - Wellness trends data
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/status` - Update user status

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post (protected)
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts/:id/comment` - Add comment (protected)
- `PATCH /api/posts/:id/like` - Like post (protected)

See codebase for complete API documentation.

---

## 🎨 UI Features

- **Dark theme** (locked, no toggle)
- Modern glassmorphism design
- Responsive layout
- Smooth animations (Framer Motion)
- Professional charts (Recharts)
- Clean, minimal interface

---

## 📝 Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb://localhost:27017/wellconnect
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
HUGGINGFACE_API_KEY=your-key-here (optional)
```

### Frontend (.env)

```env
VITE_API_BASE=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Port 5000 already in use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB connection fails
- Check MongoDB is running
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist

### API calls fail
- Verify backend is running
- Check CORS configuration
- Verify JWT token is being sent in headers

---

## 📚 Additional Documentation

- **[DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md)** - Deployment guide
- **[RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)** - Detailed Render setup

---

## 📄 License

This project is private/proprietary.

---

## 👤 Author

WellConnect Development Team
