import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    console.log('[Auth Middleware] No token provided for:', req.path);
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      console.log('[Auth Middleware] User not found for ID:', decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }
    console.log('[Auth Middleware] Authenticated user:', req.user.email, 'Role:', req.user.role);
    next();
  } catch (err) {
    console.error('[Auth Middleware] Token verification failed:', err.message);
    return res.status(401).json({ message: 'Token invalid' });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    console.log('[Admin Middleware] No user in request');
    return res.status(401).json({ message: 'Not authenticated' });
  }
  if (req.user.role !== 'admin') {
    console.log('[Admin Middleware] Access denied for user:', req.user.email, 'Role:', req.user.role);
    return res.status(403).json({ message: 'Admin only' });
  }
  console.log('[Admin Middleware] Admin access granted for:', req.user.email);
  next();
};

