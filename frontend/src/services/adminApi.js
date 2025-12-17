import api from '../api/api.js';

/**
 * Admin API Service
 * Centralized API calls for admin dashboard
 */

export const adminApi = {
  // Overview
  getOverview: async () => {
    try {
      console.log('[Admin API] Fetching overview data...');
      const response = await api.get('/admin/overview');
      console.log('[Admin API] Overview data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('[Admin API] Error fetching overview:', error);
      console.error('[Admin API] Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
    }
  },

  // User Analytics
  getUserAnalytics: async (period = '7') => {
    try {
      const response = await api.get(`/admin/user-analytics?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('[Admin API] Error fetching user analytics:', error);
      throw error;
    }
  },

  // Wellness Trends
  getWellnessTrends: async () => {
    try {
      const response = await api.get('/admin/wellness-trends');
      return response.data;
    } catch (error) {
      console.error('[Admin API] Error fetching wellness trends:', error);
      throw error;
    }
  },

  // Forum Analytics
  getForumAnalytics: async (period = '7') => {
    try {
      const response = await api.get(`/admin/forum-analytics?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('[Admin API] Error fetching forum analytics:', error);
      throw error;
    }
  },

  // AI Analytics
  getAIAnalytics: async (period = '7') => {
    try {
      const response = await api.get(`/admin/ai-analytics?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('[Admin API] Error fetching AI analytics:', error);
      throw error;
    }
  },

  // User Management
  getAllUsers: async (search = '', page = 1, limit = 50) => {
    try {
      const response = await api.get(`/admin/users?search=${search}&page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('[Admin API] Error fetching users:', error);
      throw error;
    }
  },

  updateUserRole: async (userId, role) => {
    try {
      const response = await api.put(`/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      console.error('[Admin API] Error updating user role:', error);
      throw error;
    }
  },

  updateUserStatus: async (userId, status) => {
    try {
      const response = await api.put(`/admin/users/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('[Admin API] Error updating user status:', error);
      throw error;
    }
  }
};

export default adminApi;

