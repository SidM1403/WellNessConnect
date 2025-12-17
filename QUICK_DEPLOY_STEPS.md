# Quick Deployment Steps to Vercel

## ✅ Pre-Deployment Checklist

- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] MongoDB Atlas account created (or MongoDB connection string ready)
- [ ] Vercel account created

---

## 🚀 Deployment Steps

### 1. Push Code to Git Repository

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository
4. Configure Project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root)
   - **Build Command**: Leave empty (auto-detected from vercel.json)
   - **Output Directory**: Leave empty (auto-detected from vercel.json)
   - **Install Command**: Leave empty (auto-detected)
5. Click "Deploy"

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy
vercel

# Follow prompts, then for production:
vercel --prod
```

### 3. Set Environment Variables

After first deployment, go to:
**Project Settings → Environment Variables**

Add these variables:

#### Required:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wellconnect?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-minimum-32-characters
NODE_ENV=production
```

#### Optional (but recommended):

```env
FRONTEND_URL=https://your-app-name.vercel.app
HUGGINGFACE_API_KEY=your-huggingface-key-here
```

**Generate JWT_SECRET:**
```bash
# On Mac/Linux:
openssl rand -base64 32

# Or use any random 32+ character string
```

### 4. Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**

OR push a new commit to trigger auto-deployment.

### 5. Verify Deployment

1. **Check API**: Visit `https://your-app.vercel.app/api/`
   - Should see: `{"status":"ok","message":"WellConnect API"}`

2. **Check Frontend**: Visit `https://your-app.vercel.app/`
   - Should see your WellConnect homepage

3. **Test Registration**: Try creating an account

4. **Test Login**: Log in with your account

---

## 🔧 MongoDB Atlas Setup (If Needed)

1. **Create Account**: https://www.mongodb.com/cloud/atlas/register
2. **Create Cluster**: Choose FREE tier (M0)
3. **Create Database User**:
   - Database Access → Add New User
   - Username: `wellconnect-user`
   - Password: Generate strong password
4. **Whitelist IP**:
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
5. **Get Connection String**:
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `wellconnect` (or your preferred name)

**Example connection string:**
```
mongodb+srv://wellconnect-user:YourPassword@cluster0.xxxxx.mongodb.net/wellconnect?retryWrites=true&w=majority
```

---

## ⚠️ Important Notes

1. **First Deployment**: Will fail without environment variables - this is normal. Set them and redeploy.

2. **Database Connection**: MongoDB Atlas free tier sleeps after inactivity. First request may be slow.

3. **CORS**: Frontend and backend are on the same domain, so CORS should work automatically.

4. **Auto-Deployments**: Every push to main branch triggers automatic deployment.

---

## 🐛 Troubleshooting

### "API not found" error
- Check `vercel.json` is in root directory
- Verify `api/index.js` exists
- Check deployment logs in Vercel dashboard

### MongoDB connection fails
- Verify `MONGO_URI` is correct in environment variables
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Ensure cluster is running (may take a minute if it was sleeping)

### Build fails
- Check build logs in Vercel dashboard
- Verify Node.js version (should be 18+)
- Ensure all dependencies are in package.json files

### CORS errors
- Set `FRONTEND_URL` environment variable to your Vercel URL
- Redeploy after setting environment variables

---

## 📞 Need Help?

Check deployment logs in Vercel dashboard:
1. Go to your project
2. Click on a deployment
3. View "Build Logs" and "Function Logs"

All errors are logged there with detailed messages.

