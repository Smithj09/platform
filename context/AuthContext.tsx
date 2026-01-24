import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Create user object
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
      };

      // Store in localStorage (in production, use secure HTTP-only cookies)
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'token_' + Math.random().toString(36).substr(2, 9));
      
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Basic validation
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Create user object
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
      };

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'token_' + Math.random().toString(36).substr(2, 9));
      
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
