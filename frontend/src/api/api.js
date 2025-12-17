import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[API] Request to:', config.url, 'with token:', token.substring(0, 20) + '...');
  } else {
    console.warn('[API] Request to:', config.url, 'without token');
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('[API] Response from:', response.config.url, 'Status:', response.status);
    return response;
  },
  (error) => {
    console.error('[API] Error from:', error.config?.url);
    console.error('[API] Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      console.warn('[API] Unauthorized - clearing token');
      localStorage.removeItem('token');
    }
    
    if (error.response?.status === 403) {
      console.warn('[API] Forbidden - user may not have admin role');
    }
    
    return Promise.reject(error);
  }
);

export default api;

