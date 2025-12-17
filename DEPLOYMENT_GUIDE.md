# Vercel Deployment Guide - WellConnect

This guide will help you deploy both the frontend and backend to Vercel.

## 📋 Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas account (free tier works) OR MongoDB database URL
3. Git repository (GitHub, GitLab, or Bitbucket)

---

## 🚀 Deployment Options

You have **TWO options** for deployment:

### Option 1: Monorepo Deployment (Recommended for Simplicity)
Deploy frontend and backend together from the root directory.

### Option 2: Separate Deployments
Deploy frontend and backend as separate Vercel projects.

**I recommend Option 1** as it's simpler and keeps everything together.

---

## 🎯 Option 1: Monorepo Deployment (Recommended)

### Step 1: Prepare Your Repository

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

### Step 2: Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

### Step 3: Deploy to Vercel

**Via Vercel Dashboard (Easiest):**

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as is (root)
   - **Build Command**: Leave empty (handled by vercel.json)
   - **Output Directory**: Leave empty (handled by vercel.json)
   - **Install Command**: `npm install` (or `npm install --prefix backend && npm install --prefix frontend`)

**Via CLI:**

```bash
cd /path/to/SidProjectCSE
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name: **wellconnect** (or your preferred name)
- Directory: **./**

### Step 4: Set Environment Variables

After deployment, go to your Vercel project dashboard → Settings → Environment Variables and add:

#### Backend Environment Variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wellconnect
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NODE_ENV=production
HUGGINGFACE_API_KEY=your-huggingface-api-key-here (optional)
FRONTEND_URL=https://your-frontend-vercel-url.vercel.app
```

#### Frontend Environment Variables (if needed):

```env
VITE_API_BASE=/api
```

**Important Notes:**
- Replace `MONGO_URI` with your actual MongoDB connection string
- Generate a strong `JWT_SECRET` (use: `openssl rand -base64 32`)
- `FRONTEND_URL` will be your Vercel deployment URL (e.g., `https://wellconnect.vercel.app`)

### Step 5: Redeploy After Setting Environment Variables

After adding environment variables, go to:
- Deployments → Click the "..." menu on latest deployment → Redeploy

Or trigger a new deployment by pushing a commit.

---

## 🎯 Option 2: Separate Deployments (Advanced)

If you prefer separate deployments for frontend and backend:

### Backend Deployment

1. **Create a new Vercel project for backend**
2. **Root Directory**: Set to root (or create backend-specific vercel.json)
3. **Build Command**: Leave empty
4. **Output Directory**: Leave empty
5. **Install Command**: `npm install --prefix backend`

**Backend vercel.json (if deploying separately):**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/server.js"
    }
  ]
}
```

### Frontend Deployment

1. **Create a new Vercel project for frontend**
2. **Root Directory**: `frontend`
3. **Framework Preset**: Vite
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

**Frontend Environment Variables:**
```env
VITE_API_BASE=https://your-backend-url.vercel.app/api
```

---

## 🔧 MongoDB Atlas Setup (If Needed)

If you don't have MongoDB set up yet:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier M0)
4. Create a database user:
   - Database Access → Add New User
   - Username: `wellconnect-user`
   - Password: Generate a strong password
5. Whitelist IP addresses:
   - Network Access → Add IP Address
   - For Vercel: Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://wellconnect-user:YourPassword@cluster0.xxxxx.mongodb.net/wellconnect?retryWrites=true&w=majority`

---

## ✅ Post-Deployment Checklist

After deployment:

1. ✅ Check backend API is working:
   - Visit: `https://your-app.vercel.app/api/`
   - Should return: `{"status":"ok","message":"WellConnect API"}`

2. ✅ Check frontend is loading:
   - Visit: `https://your-app.vercel.app/`
   - Should show the WellConnect homepage

3. ✅ Test authentication:
   - Try registering a new user
   - Try logging in
   - Check if token persists

4. ✅ Verify CORS is working:
   - Check browser console for CORS errors
   - All API calls should succeed

5. ✅ Test protected routes:
   - Access `/dashboard` (should work when logged in)
   - Access `/admin/*` (should work only for admin users)

---

## 🐛 Troubleshooting

### Issue: API returns 404

**Solution**: 
- Check that routes in `vercel.json` are correct
- Ensure `api/index.js` exports the Express app correctly
- Verify environment variables are set

### Issue: MongoDB connection fails

**Solution**:
- Verify `MONGO_URI` is correct in Vercel environment variables
- Check MongoDB Atlas IP whitelist includes Vercel IPs
- Ensure MongoDB cluster is running

### Issue: CORS errors

**Solution**:
- Set `FRONTEND_URL` environment variable to your Vercel frontend URL
- Include protocol: `https://your-app.vercel.app`
- Redeploy after setting environment variables

### Issue: Build fails

**Solution**:
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure Node.js version is compatible (Vercel uses Node 18+ by default)

### Issue: Frontend can't reach API

**Solution**:
- Verify API routes start with `/api/` in frontend code
- Check `VITE_API_BASE` is set to `/api` (for same-origin) or full backend URL
- For monorepo, API should be at `/api/*`

---

## 📝 Environment Variables Reference

### Required for Backend:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (32+ characters recommended)
- `NODE_ENV` - Set to `production`

### Optional for Backend:
- `HUGGINGFACE_API_KEY` - For AI assistant features
- `FRONTEND_URL` - Frontend URL for CORS (auto-detected from Vercel if not set)
- `PORT` - Not needed on Vercel (auto-handled)

### Optional for Frontend:
- `VITE_API_BASE` - API base URL (defaults to `/api` for same-origin)

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your main branch. To deploy from a different branch:

1. Go to Project Settings → Git
2. Configure Production Branch
3. Set up Preview Deployments for pull requests

---

## 📚 Additional Resources

- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Vercel Serverless Functions: https://vercel.com/docs/concepts/functions

---

**Need Help?** Check the build logs in Vercel dashboard for detailed error messages.

