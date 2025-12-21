# Render.com Deployment Guide (Easiest Option)

This guide will help you deploy your WellConnect app to Render in about 10 minutes!

---

## 📋 Prerequisites

- ✅ GitHub repository with your code
- ✅ MongoDB Atlas account (free tier works)
- ✅ Render account (free signup at https://render.com)

---

## 🚀 Step 1: Deploy Backend (Express API)

### 1.1 Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account (if not connected)
4. Select your repository: `WellNessConnect`
5. Click **"Connect"**

### 1.2 Configure Backend Service

Fill in the form:

**Basic Settings:**
- **Name**: `wellconnect-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`

**Build & Deploy:**
- **Runtime**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Root Directory**: `backend` ⚠️ IMPORTANT!

**Plan:**
- Select **"Free"** (for now, upgrade later if needed)

### 1.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/wellconnect?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-32-plus-characters
NODE_ENV=production
FRONTEND_URL=https://wellconnect-frontend.onrender.com
HUGGINGFACE_API_KEY=your-huggingface-key-here
```

**Important:** 
- Replace `MONGO_URI` with your actual MongoDB Atlas connection string
- Replace `JWT_SECRET` with a strong random string
- `FRONTEND_URL` will be your frontend Render URL (we'll get this in Step 2)

### 1.4 Deploy

Click **"Create Web Service"**

Render will:
- Clone your repo
- Install dependencies
- Start your backend
- Give you a URL like: `https://wellconnect-backend.onrender.com`

**⏳ Wait 2-3 minutes for first deployment**

---

## 🎨 Step 2: Deploy Frontend (React App)

### 2.1 Create Static Site

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Select your repository again: `WellNessConnect`
3. Click **"Connect"**

### 2.2 Configure Frontend Service

Fill in the form:

**Basic Settings:**
- **Name**: `wellconnect-frontend`
- **Branch**: `main`

**Build Settings:**
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Root Directory**: `frontend` ⚠️ IMPORTANT!

**Environment Variables:**
- Click **"Add Environment Variable"**
- Add: `VITE_API_BASE` = `https://wellconnect-backend.onrender.com/api`
  - ⚠️ Replace `wellconnect-backend` with your actual backend service name!

### 2.3 Deploy

Click **"Create Static Site"**

**⏳ Wait 2-3 minutes for deployment**

You'll get a URL like: `https://wellconnect-frontend.onrender.com`

---

## 🔄 Step 3: Update Environment Variables

After frontend is deployed, you need to update backend's `FRONTEND_URL`:

1. Go to your **backend service** in Render dashboard
2. Go to **"Environment"** tab
3. Update `FRONTEND_URL` to your frontend URL: `https://wellconnect-frontend.onrender.com`
4. Click **"Save Changes"**
5. Render will auto-redeploy

---

## ✅ Step 4: Test Your Deployment

1. **Test Frontend**: Visit `https://wellconnect-frontend.onrender.com`
   - Should see your homepage

2. **Test Backend API**: Visit `https://wellconnect-backend.onrender.com/api/`
   - Should see: `{"status":"ok","message":"WellConnect API"}`

3. **Test Registration**: Try creating a new account
   - Should work!

4. **Test Login**: Log in with your account
   - Should work!

---

## 🔧 Configuration Files Needed

I'll need to create a simple configuration for Render. Let me check what we need:

### For Backend:

Make sure `backend/server.js` exports the app correctly (already done ✅)

### For Frontend:

Update `frontend/src/api/api.js` to use environment variable (already done ✅)

---

## 📝 Environment Variables Summary

### Backend (Render Web Service):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wellconnect?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-32-plus-characters
NODE_ENV=production
FRONTEND_URL=https://wellconnect-frontend.onrender.com
HUGGINGFACE_API_KEY=your-huggingface-key-here
```

### Frontend (Render Static Site):
```env
VITE_API_BASE=https://wellconnect-backend.onrender.com/api
```

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check build logs in Render dashboard
- ✅ Verify `Root Directory` is set to `backend`
- ✅ Check `Start Command` is correct: `cd backend && npm start`
- ✅ Verify all environment variables are set

### Frontend can't connect to backend
- ✅ Check `VITE_API_BASE` is set correctly
- ✅ Verify backend URL is correct (no trailing slash)
- ✅ Check backend is running (visit backend URL)

### CORS errors
- ✅ Update `FRONTEND_URL` in backend environment variables
- ✅ Make sure it matches your frontend Render URL exactly
- ✅ Redeploy backend after updating

### MongoDB connection fails
- ✅ Verify `MONGO_URI` is correct
- ✅ Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- ✅ Ensure MongoDB cluster is running

---

## 🎉 That's It!

Your app should now be live on Render! 

**Frontend URL**: `https://wellconnect-frontend.onrender.com`
**Backend URL**: `https://wellconnect-backend.onrender.com`

---

## 💡 Pro Tips

1. **Custom Domain**: Render supports custom domains (free tier)
2. **Auto-Deploy**: Every push to `main` branch auto-deploys
3. **Logs**: View logs in real-time in Render dashboard
4. **Sleeping**: Free tier backend sleeps after 15 min inactivity (first request wakes it up)

---

## 📚 Need Help?

- Render Docs: https://render.com/docs
- Check deployment logs in Render dashboard
- All errors are logged with detailed messages

**This should be much easier than Vercel!** 🚀

