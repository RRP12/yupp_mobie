import api, { removeTokens, storeTokens } from './axios';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
  role?: string;
  profileImage?: string;
  bio?: string;
}

interface LoginParams {
  email: string;
  password: string;
}

// Service functions for authentication
const AuthService = {
  // Register a new user
  register: async (userData: RegisterParams) => {
    try {
      const response = await api.post('/auth/users', userData);

      console.log("data" , response.data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials: LoginParams) => {
    try {
      console.log('Sending login request with credentials:', { email: credentials.email });
      const response = await api.post('/auth/login', credentials);
      
      console.log('Login response received:', JSON.stringify(response.data, null, 2));
      
      // Check if response has tokens directly at the root level
      if (response.data.accessToken && response.data.refreshToken) {
        console.log('Login successful, storing tokens');
        // Store tokens in secure storage
        await storeTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        
        // Return in the format expected by the rest of the application
        return {
          success: true,
          data: response.data,
          message: 'Login successful'
        };
      } 
      // Also handle the original expected format for backwards compatibility
      else if (response.data.success && response.data.data) {
        console.log('Login successful (nested data structure), storing tokens');
        await storeTokens({
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
        });
        
        return response.data;
      } 
      else {
        console.log('Login response format issue - tokens missing');
        console.log('Response data structure:', Object.keys(response.data));
        throw new Error('Invalid response format - missing tokens');
      }
    } catch (error: any) {
      console.log('Login error:', error.message);
      
      if (error.response) {
        console.log('Error response status:', error.response.status);
        console.log('Error response data:', JSON.stringify(error.response.data, null, 2));
      } else {
        console.log('No error.response object');
      }
      
      throw error.response?.data || { success: false, message: 'Login failed' };
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Optional: Call logout endpoint if your API supports it
      try {
        await api.post('/auth/logout');
      } catch (error) {
        console.log('Logout API call failed, proceeding with client-side logout');
      }
      
      // Remove tokens from secure storage
      await removeTokens();
      
      return { success: true, message: 'Logged out successfully' };
    } catch (error: any) {
      throw { success: false, message: 'Logout failed' };
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      console.log('Fetching current user profile');
      const response = await api.get('/auth/me');
      console.log('Current user response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error: any) {
      console.log('Error fetching user profile:', error.message);
      if (error.response) {
        console.log('Error response status:', error.response.status);
        console.log('Error response data:', JSON.stringify(error.response.data, null, 2));
      }
      throw error.response?.data || { success: false, message: 'Failed to get user profile' };
    }
  },
};

export default AuthService;
