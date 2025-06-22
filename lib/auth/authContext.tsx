import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../../api/authService';
import { getAccessToken, getRefreshToken } from '../../api/axios';

// Define types for our context
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in
  const checkAuthState = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();

      if (accessToken && refreshToken) {
        try {
          // Try to get current user data
          const response = await AuthService.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
            return true;
          }
        } catch (userError) {
          console.log('Error fetching user profile:', userError);
          console.log('Creating fallback user since tokens exist');
          
          // Fallback: Create a temporary user object since we have valid tokens
          // This allows the app to function even if the /auth/me endpoint isn't available
          setUser({
            _id: 'temp-user-id',
            name: 'User',
            email: 'user@example.com',
            role: 'user'
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking auth state:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth state when app starts
  useEffect(() => {
    const initializeAuth = async () => {
      const isAuthenticated = await checkAuthState();
      
      // Redirect based on authentication status
      if (isAuthenticated) {
        // Navigate to home screen if authenticated
        router.replace('/(tabs)');
      } else {
        // Navigate to login screen if not authenticated
        router.replace('/(auth)/login');
      }
    };

    initializeAuth();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.login({ email, password });
      
      if (response.success && response.data) {
        await checkAuthState(); // This will update the user state
        router.replace('/(tabs)');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.register(userData);
      
      if (response.success) {
        // Redirect to login after successful registration
        router.replace('/(auth)/login');
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
      router.replace('/(auth)/login');
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  // Value object for the context provider
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
