# WellConnect (MERN)

Full-stack health & wellness community with authentication, forum, resources, dashboards, and admin moderation.

## Stack
- Backend: Node.js, Express, MongoDB/Mongoose, JWT, bcrypt, express-validator, CORS
- Frontend: React + Vite, TailwindCSS, React Router, Axios, Context API, Framer Motion, Lucide icons

## Quickstart
### Backend
```
cd wellconnect/backend
npm install
copy .env.example .env  # set MONGO_URI, JWT_SECRET, PORT
npm run dev
```

### Frontend
```
cd wellconnect/frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173 and calls API at http://localhost:5000.

## API Routes
- Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me, PUT /api/auth/update
- Users: GET /api/users/:id, DELETE /api/users/:id
- Posts: GET /api/posts, POST /api/posts, GET /api/posts/:id, POST /api/posts/:id/comment, PATCH /api/posts/:id/like, DELETE /api/posts/:id
- Resources: GET /api/resources, POST /api/resources (admin), DELETE /api/resources/:id (admin)
- Admin: GET /api/admin/users, GET /api/admin/posts, PATCH /api/admin/user/:id/role, DELETE /api/admin/post/:id

## Folder Structure
```
wellconnect/
  backend/
    server.js
    config/db.js
    controllers/
    middleware/
    models/
    routes/
    utils/
    package.json
  frontend/
    index.html
    src/
      api/
      components/
      context/
      pages/
      App.jsx
      main.jsx
    tailwind.config.js
    package.json
```

## Notes
- Protected and admin routes require `Authorization: Bearer <token>`.
- Admin seeding: set a user's `role` to `admin` directly in the database or via PATCH /api/admin/user/:id/role.
- Forgot password endpoint returns a placeholder response; wire to email of choice.

