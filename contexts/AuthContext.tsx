import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Platform-specific storage utilities
const storage = {
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },
  
  async removeItem(key: string) {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
};

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await storage.getItem('auth_token');
      if (token) {
        // Validate token and get user info
        const userData = await validateToken(token);
        if (userData) {
          setUser(userData);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async (token: string): Promise<User | null> => {
    try {
      // In a real app, validate with your backend
      // For demo purposes, we'll simulate a valid user
      const mockUser = {
        id: '1',
        email: 'user@example.com',
        name: 'Demo User',
      };
      return mockUser;
    } catch (error) {
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, authenticate with your backend
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      
      const token = 'mock_jwt_token';
      await storage.setItem('auth_token', token);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, create account with your backend
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
      };
      
      const token = 'mock_jwt_token';
      await storage.setItem('auth_token', token);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);

      // For demo purposes, simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = {
        id: '1',
        email: 'google.user@gmail.com',
        name: 'Google User',
      };

      const token = 'mock_google_token';
      await storage.setItem('auth_token', token);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async () => {
    try {
      setIsLoading(true);

      // For demo purposes, simulate Apple OAuth
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = {
        id: '1',
        email: 'apple.user@icloud.com',
        name: 'Apple User',
      };

      const token = 'mock_apple_token';
      await storage.setItem('auth_token', token);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Apple sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await storage.removeItem('auth_token');
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}