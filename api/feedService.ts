import api from './axios';

// Feed service for handling all feed-related API calls
const FeedService = {
  // Get personalized feed
  getPersonalizedFeed: async (params: {
    category?: string;
    sortBy?: string;
    reelsOnly?: boolean;
    subCategory?: string;
    lat?: number;
    lng?: number;
    maxDistance?: number;
  } = {}) => {
    try {
      const queryString = new URLSearchParams();
      
      // Add params to query string if they exist
      if (params.category) queryString.append('category', params.category);
      if (params.sortBy) queryString.append('sortBy', params.sortBy);
      if (params.reelsOnly) queryString.append('reelsOnly', params.reelsOnly.toString());
      if (params.subCategory) queryString.append('subCategory', params.subCategory);
      if (params.lat) queryString.append('lat', params.lat.toString());
      if (params.lng) queryString.append('lng', params.lng.toString());
      if (params.maxDistance) queryString.append('maxDistance', params.maxDistance.toString());
      
      const url = `/feed/personalized${queryString.toString() ? `?${queryString.toString()}` : ''}`;
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Failed to get personalized feed' };
    }
  },

  // Get trending feed
  getTrendingFeed: async (params: { category?: string } = {}) => {
    try {
      const queryString = new URLSearchParams();
      
      // Add category to query string if it exists
      if (params.category) queryString.append('category', params.category);
      
      const url = `/feed/trending${queryString.toString() ? `?${queryString.toString()}` : ''}`;
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Failed to get trending feed' };
    }
  },

  // Get available categories
  getCategories: async () => {
    try {
      const response = await api.get('/feed/categories');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Failed to get categories' };
    }
  },

  // Follow a store
  followStore: async (storeId: string) => {
    try {
      const response = await api.post('/feed/follow-store', { storeId });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Failed to follow store' };
    }
  },

  // Unfollow a store
  unfollowStore: async (storeId: string) => {
    try {
      const response = await api.delete('/feed/follow-store', { data: { storeId } });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Failed to unfollow store' };
    }
  },

  // Get user preferences
  getUserPreferences: async () => {
    try {
      const response = await api.get('/feed/preferences');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Failed to get user preferences' };
    }
  },

  // Update user preferences
  updateUserPreferences: async (preferences: {
    categories?: string[];
    settings?: {
      sortBy?: string;
      maxDistance?: number;
    };
  }) => {
    try {
      const response = await api.put('/feed/preferences', preferences);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Failed to update user preferences' };
    }
  },

  // Get feed service health
  getHealth: async () => {
    try {
      const response = await api.get('/feed/health');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Failed to get health status' };
    }
  },

  // Get feed statistics
  getStats: async () => {
    try {
      const response = await api.get('/feed/stats');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Failed to get feed statistics' };
    }
  },
};

export default FeedService;
