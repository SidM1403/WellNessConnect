import axios from 'axios';

// Log the base URL being used
// In development, use proxy via '/api', in production use env variable or same origin
const baseURL = import.meta.env.VITE_API_BASE || (import.meta.env.DEV ? '/api' : '/api');
console.log('[API] Using base URL:', baseURL);

const api = axios.create({
  baseURL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`[API] ${config.method.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        data: config.data
      });
    } else {
      console.warn(`[API] ${config.method.toUpperCase()} ${config.url} - No auth token`);
    }
    return config;
  },
  (error) => {
    console.error('[API] Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response ${response.status} from ${response.config.url}`, {
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    const response = error.response;
    const errorMessage = response?.data?.message || error.message || 'Network Error';
    const status = response?.status;
    
    console.error(`[API] Error ${status || 'NO_STATUS'} from ${error.config?.url}:`, {
      message: errorMessage,
      status,
      statusText: response?.statusText,
      data: response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data
      }
    });
    
    // Handle specific error statuses
    if (status === 401) {
      console.warn('[API] Unauthorized - clearing token');
      localStorage.removeItem('token');
      // Only redirect if not already on login/signup page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
        window.location.href = '/login';
      }
    } else if (status === 403) {
      console.warn('[API] Forbidden - user may not have required permissions');
    }
    
    // Preserve original error for better debugging, but provide message
    const error = new Error(errorMessage);
    error.status = status;
    error.response = response;
    return Promise.reject(error);
  }
);

export default api;
