import { User } from '../context/AuthContext';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

const API_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Authentication Service
 * This is a placeholder for API calls. Replace with actual backend endpoints.
 */

export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Replace with actual API call
    // const response = await fetch(`${API_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials),
    // });
    // return response.json();

    // Mock implementation
    return {
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        name: credentials.email.split('@')[0],
      },
      token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
    };
  },

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    // Replace with actual API call
    // const response = await fetch(`${API_URL}/auth/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return response.json();

    // Mock implementation
    return {
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
      },
      token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
    };
  },

  /**
   * Verify token validity
   */
  async verifyToken(token: string): Promise<User> {
    // Replace with actual API call
    // const response = await fetch(`${API_URL}/auth/verify`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // return response.json();

    // Mock implementation
    return {
      id: '123',
      email: 'user@example.com',
      name: 'User',
    };
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    // Replace with actual API call if needed
    // await fetch(`${API_URL}/auth/logout`, { method: 'POST' });
  },
};
