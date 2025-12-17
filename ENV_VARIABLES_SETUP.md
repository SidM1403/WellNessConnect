# Environment Variables Setup Guide

## 📋 Quick Copy-Paste for Vercel

Copy these to **Vercel Dashboard → Project Settings → Environment Variables**:

### Required Variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/wellconnect?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-32-plus-characters
NODE_ENV=production
```

### Optional but Recommended:

```env
FRONTEND_URL=https://your-app-name.vercel.app
HUGGINGFACE_API_KEY=your-huggingface-api-key-here
```

---

## 🔧 Local Development (.env files)

### For Backend (create `backend/.env`):

```env
MONGO_URI=mongodb://localhost:27017/wellconnect
JWT_SECRET=dev-secret-key-change-in-production
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
HUGGINGFACE_API_KEY=your-huggingface-api-key-here
```

### For Frontend (create `frontend/.env`):

```env
VITE_API_BASE=/api
```

---

## 📝 How to Get Each Variable

### 1. MONGO_URI (MongoDB Connection String)

**For MongoDB Atlas (Cloud - Recommended):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Create database user: **Database Access** → Add New User
4. Whitelist IP: **Network Access** → Add IP Address → Allow from anywhere (0.0.0.0/0)
5. Get connection string: **Clusters** → Connect → Connect your application
6. Copy the connection string
7. Replace `<password>` with your database user password
8. Replace `<dbname>` with `wellconnect` (optional)

**Example:**
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/wellconnect?retryWrites=true&w=majority
```

**For Local MongoDB:**
```
mongodb://localhost:27017/wellconnect
```

### 2. JWT_SECRET (Authentication Secret)

Generate a secure random string:

**Mac/Linux:**
```bash
openssl rand -base64 32
```

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Or use any random 32+ character string:**
```
MySuperSecretKey2024!@#$%^&*()_+-=[]{}|;:,.<>?
```

### 3. NODE_ENV

- **Development:** `development`
- **Production (Vercel):** `production`

### 4. FRONTEND_URL

- **Local:** `http://localhost:5173`
- **Vercel:** `https://your-app-name.vercel.app` (your actual Vercel URL)

### 5. HUGGINGFACE_API_KEY (Optional)

1. Go to https://huggingface.co/settings/tokens
2. Create account/login
3. Click "New token"
4. Give it a name
5. Copy the token
6. Set it as `HUGGINGFACE_API_KEY`

**Note:** AI features will work without this but with limited functionality.

### 6. VITE_API_BASE (Optional - Frontend)

- **Local dev (with proxy):** `/api` or leave empty
- **Vercel monorepo:** `/api` or leave empty
- **Separate backend:** `https://your-backend.vercel.app/api`

---

## ✅ Verification Checklist

After setting environment variables:

### Local Development:
- [ ] `backend/.env` file created with all variables
- [ ] `frontend/.env` file created (optional)
- [ ] Backend starts without errors
- [ ] Frontend can connect to backend API

### Vercel Deployment:
- [ ] All required variables set in Vercel dashboard
- [ ] `MONGO_URI` is correct (with real password)
- [ ] `JWT_SECRET` is strong (32+ characters)
- [ ] `FRONTEND_URL` matches your Vercel URL
- [ ] Redeployed after setting variables
- [ ] API endpoint responds: `https://your-app.vercel.app/api/`
- [ ] Frontend loads: `https://your-app.vercel.app/`

---

## 🔒 Security Notes

1. **Never commit `.env` files to Git** (they're in `.gitignore`)
2. **Use different JWT_SECRET for production** than development
3. **Keep MongoDB password strong** and rotate regularly
4. **Don't share environment variables** publicly
5. **Use Vercel's environment variable encryption** for production

---

## 🐛 Troubleshooting

### "MongoDB connection error"
- Check `MONGO_URI` is correct
- Verify password in connection string
- Check MongoDB Atlas IP whitelist
- Ensure cluster is running

### "Not authorized" / JWT errors
- Verify `JWT_SECRET` is set
- Check `JWT_SECRET` is same in all environments
- Regenerate token after changing `JWT_SECRET`

### CORS errors
- Set `FRONTEND_URL` correctly
- Include protocol (`https://` or `http://`)
- No trailing slash in URL
- Redeploy after changing `FRONTEND_URL`

