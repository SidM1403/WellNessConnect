# Deployment Instructions - WellConnect

Simple, beginner-friendly deployment guide for hosting your full-stack MERN application.

---

## 📋 Prerequisites

- ✅ GitHub account and repository with your code
- ✅ MongoDB Atlas account (free tier works)
- ✅ Render account (free signup at https://render.com)
- ✅ Vercel account (free signup at https://vercel.com)

---

## 🎯 Deployment Strategy

**Backend**: Render.com (recommended) or Railway.app  
**Frontend**: Vercel  
**Database**: MongoDB Atlas (cloud)

---

## 🗄️ Step 1: Setup MongoDB Atlas (5 minutes)

### 1.1 Create Account & Cluster

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster:
   - Choose **FREE** tier (M0 Sandbox)
   - Select closest region
   - Name it: `wellconnect-cluster`

### 1.2 Create Database User

1. Go to **Database Access** → **Add New Database User**
2. Username: `wellconnect-user`
3. Password: Generate a strong password (save it!)
4. Database User Privileges: **Read and write to any database**

### 1.3 Whitelist IP Addresses

1. Go to **Network Access** → **Add IP Address**
2. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Click **Confirm**

### 1.4 Get Connection String

1. Go to **Clusters** → Click **Connect**
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string

**Example:**
```
mongodb+srv://wellconnect-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/wellconnect?retryWrites=true&w=majority
```

5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `wellconnect` (or leave as is)

**Save this connection string!** You'll need it for backend deployment.

---

## 🔧 Step 2: Deploy Backend to Render (10 minutes)

### 2.1 Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account (if not connected)
4. Select your repository: `WellNessConnect` (or your repo name)
5. Click **"Connect"**

### 2.2 Configure Backend

Fill in the form:

- **Name**: `wellconnect-backend` (or your preferred name)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ IMPORTANT!
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Select **"Free"**

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables one by one:

```env
MONGO_URI=mongodb+srv://wellconnect-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/wellconnect?retryWrites=true&w=majority
```

```env
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
```

**Generate JWT_SECRET:**
- Mac/Linux: `openssl rand -base64 32`
- Or use any random 32+ character string

```env
NODE_ENV=production
```

```env
FRONTEND_URL=https://wellconnect-frontend.vercel.app
```
*(Update this after deploying frontend)*

### 2.4 Deploy

Click **"Create Web Service"**

⏳ Wait 2-3 minutes for deployment. You'll get a URL like:
`https://wellconnect-backend.onrender.com`

**Test it**: Visit `https://wellconnect-backend.onrender.com/api/`
- Should see: `{"status":"ok","message":"WellConnect API"}`

---

## 🎨 Step 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Create New Project

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your repository: `WellNessConnect`
4. Click **"Import"**

### 3.2 Configure Frontend

- **Framework Preset**: **Vite**
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.3 Add Environment Variable

Click **"Environment Variables"** → **Add New**

```env
VITE_API_BASE=https://wellconnect-backend.onrender.com/api
```

*(Replace `wellconnect-backend.onrender.com` with your actual backend URL)*

### 3.4 Deploy

Click **"Deploy"**

⏳ Wait 1-2 minutes. You'll get a URL like:
`https://wellconnect-frontend.vercel.app`

---

## 🔄 Step 4: Update Environment Variables

### 4.1 Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Click your backend service
3. Go to **"Environment"** tab
4. Update `FRONTEND_URL` to your Vercel frontend URL:
   ```
   https://wellconnect-frontend.vercel.app
   ```
5. Click **"Save Changes"**
6. Render will auto-redeploy

### 4.2 Verify CORS

After redeploy, test that frontend can access backend:
- Frontend URL should work
- No CORS errors in browser console
- API calls should succeed

---

## ✅ Step 5: Test Your Deployment

### 5.1 Test Frontend
- ✅ Visit your Vercel URL
- ✅ Should see homepage
- ✅ No console errors

### 5.2 Test Backend
- ✅ Visit: `https://your-backend.onrender.com/api/`
- ✅ Should see: `{"status":"ok","message":"WellConnect API"}`

### 5.3 Test Full Flow
- ✅ Register a new user
- ✅ Login
- ✅ Access dashboard
- ✅ Test admin features (if admin user)

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check build logs in Render dashboard
- ✅ Verify `Root Directory` is `backend`
- ✅ Check `Start Command` is `npm start`
- ✅ Verify all environment variables are set

### Frontend can't connect to backend
- ✅ Verify `VITE_API_BASE` is correct
- ✅ Check backend URL (should be `/api` at end)
- ✅ Ensure backend is running
- ✅ Check CORS settings

### MongoDB connection fails
- ✅ Verify `MONGO_URI` is correct (with password)
- ✅ Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- ✅ Ensure cluster is running (may take a minute if sleeping)

### CORS errors
- ✅ Update `FRONTEND_URL` in backend environment variables
- ✅ Include protocol: `https://your-app.vercel.app`
- ✅ No trailing slash
- ✅ Redeploy backend after updating

---

## 📝 Environment Variables Summary

### Backend (Render):

**Required:**
- `MONGO_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Random 32+ character string
- `NODE_ENV` - Set to `production`

**Optional:**
- `FRONTEND_URL` - Your Vercel frontend URL
- `HUGGINGFACE_API_KEY` - Get free token from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### Frontend (Vercel):

**Required:**
- `VITE_API_BASE` - Your Render backend URL + `/api`

**Example:**
```
VITE_API_BASE=https://wellconnect-backend.onrender.com/api
```

---

## 🎉 That's It!

Your app should now be live:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.onrender.com`

---

## 💡 Pro Tips

1. **Custom Domains**: Both Render and Vercel support custom domains (free)
2. **Auto-Deploy**: Every push to `main` branch triggers automatic deployment
3. **Logs**: View logs in real-time in Render/Vercel dashboards
4. **Free Tier Limits**:
   - Render: Backend sleeps after 15 min inactivity (wakes on first request)
   - Vercel: Generous free tier, no sleeping
   - MongoDB Atlas: 512MB storage, perfect for development

---

## 🔄 Alternative: Railway Deployment

If you prefer Railway for backend:

1. Go to https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway auto-detects Node.js
5. Set environment variables (same as Render)
6. That's it! Railway is even simpler.

---

**Need Help?** Check deployment logs in Render/Vercel dashboards for detailed error messages.

