# 🔐 Admin Dashboard - Quick Access Guide

## 📍 Where to Access the Admin Dashboard

### **URL:**
```
http://localhost:5173/admin
```

### **Steps to Access:**

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on: `http://localhost:5000`

2. **Start the Frontend Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

3. **Login as Admin**
   - Go to: `http://localhost:5173/login`
   - Enter your admin account credentials
   - Click "Login"

4. **Access Admin Dashboard**
   - After login, navigate to: `http://localhost:5173/admin`
   - Or click any admin link in the navigation (if available)

---

## 🎯 Admin Dashboard Pages

Once you're in the admin dashboard, you'll see a sidebar with these pages:

| Page | URL | Description |
|------|-----|-------------|
| **Overview** | `/admin` | Summary cards with key metrics |
| **User Analytics** | `/admin/users` | User engagement charts and trends |
| **Wellness Trends** | `/admin/wellness` | Health data insights (anonymous) |
| **Forum Analytics** | `/admin/forums` | Forum statistics and moderation |
| **AI Analytics** | `/admin/ai` | AI assistant usage metrics |
| **User Management** | `/admin/manage` | Manage users, roles, and status |

---

## 🔑 Creating Your First Admin Account

### Quick Method (MongoDB):

1. **Register a regular account** through the signup page
2. **Open MongoDB Compass** or MongoDB shell
3. **Find the user** in the `users` collection
4. **Update the role**:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin", status: "active" } }
   )
   ```
5. **Logout and login again** with that account
6. **Access** `/admin` - you should now have admin access!

---

## ⚠️ Important Notes

- **403 Forbidden?** → Your account doesn't have `role: "admin"` in the database
- **Can't see data?** → Make sure MongoDB has data in the collections
- **Charts not loading?** → Check browser console for errors
- **API errors?** → Verify backend is running on port 5000

---

## 🚀 Production Access

If deployed to production:
- Replace `localhost:5173` with your production domain
- Example: `https://yourdomain.com/admin`

---

**Need more details?** See `ADMIN_DASHBOARD_SETUP.md` for complete setup instructions.

