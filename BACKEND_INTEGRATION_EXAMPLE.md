/**
 * BACKEND INTEGRATION EXAMPLE
 * 
 * This file shows how to connect your authentication system to a real backend.
 * Use this as a reference when setting up your backend API.
 */

// ============================================================================
// EXAMPLE 1: SIMPLE BACKEND WITH NODE.JS/EXPRESS
// ============================================================================

/*
// Backend (example - Node.js with Express)

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const users = []; // In production, use a database

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    };
    users.push(newUser);

    // Create token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token endpoint
app.get('/api/auth/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'your-secret-key');
    const user = users.find(u => u.id === decoded.id);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
*/

// ============================================================================
// EXAMPLE 2: FRONTEND UPDATE - authService.ts
// ============================================================================

/*
// Update your authService.ts with real API calls:

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const authService = {
  async login(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include', // Include cookies
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  async register(data) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return response.json();
  },

  async verifyToken(token) {
    const response = await fetch(`${API_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    return response.json();
  },

  async logout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  },
};
*/

// ============================================================================
// EXAMPLE 3: ENVIRONMENT VARIABLES (.env)
// ============================================================================

/*
VITE_API_URL=http://localhost:3000/api
// For production:
// VITE_API_URL=https://api.yourdomain.com/api
*/

// ============================================================================
// EXAMPLE 4: UPDATE AuthContext TO USE SERVICE
// ============================================================================

/*
import { authService } from '../services/authService';

const login = async (email: string, password: string): Promise<void> => {
  setIsLoading(true);
  try {
    const response = await authService.login({ email, password });
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('authToken', response.token);
    setUser(response.user);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

const register = async (name: string, email: string, password: string): Promise<void> => {
  setIsLoading(true);
  try {
    const response = await authService.register({ name, email, password });
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('authToken', response.token);
    setUser(response.user);
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};
*/

// ============================================================================
// EXAMPLE 5: SECURE APPROACH WITH HTTP-ONLY COOKIES
// ============================================================================

/*
// In this approach, the backend sets an httpOnly cookie
// Frontend doesn't need to store the token

const login = async (email: string, password: string): Promise<void> => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Important: include cookies
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    setUser(data.user);
    // Token is stored in httpOnly cookie by backend
    // No need to store in localStorage
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};
*/

// ============================================================================
// EXAMPLE 6: ADD INTERCEPTOR FOR API REQUESTS
// ============================================================================

/*
// Utility function to make authenticated API calls
export async function makeAuthenticatedRequest(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('authToken');

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Include cookies
  });
}

// Usage:
// const response = await makeAuthenticatedRequest('/api/user/profile');
*/

// ============================================================================
// DATABASE SCHEMA EXAMPLE (SQL)
// ============================================================================

/*
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token VARCHAR(500) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/

// ============================================================================
// SECURITY CHECKLIST
// ============================================================================

/*
Production Checklist:
☐ Use HTTPS only (no HTTP)
☐ Hash passwords with bcrypt or similar
☐ Use JWT with expiration times
☐ Implement refresh tokens
☐ Use httpOnly, secure, sameSite cookies
☐ Add CORS properly configured
☐ Implement rate limiting on auth endpoints
☐ Add email verification
☐ Add password reset flow
☐ Implement account lockout after failed attempts
☐ Log authentication events
☐ Use environment variables for secrets
☐ Validate all inputs server-side
☐ Implement CSRF protection
☐ Add 2FA/MFA support
☐ Monitor suspicious activities
*/

export {};
