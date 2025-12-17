// Lightweight in-memory rate limiter to avoid extra dependencies
// Uses a sliding window per IP; suitable for low-volume feature endpoints.
const buckets = new Map();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 30; // per window per IP

export const articleRateLimiter = (req, res, next) => {
  const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const bucket = buckets.get(key) || { start: now, count: 0 };

  // Reset window if expired
  if (now - bucket.start > WINDOW_MS) {
    bucket.start = now;
    bucket.count = 0;
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  if (bucket.count > MAX_REQUESTS) {
    return res
      .status(429)
      .json({ message: 'Too many article searches. Please try again in a few minutes.' });
  }

  return next();
};

export default articleRateLimiter;

