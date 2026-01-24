# Authentication System Guide

## Overview

This application now includes a complete authentication system with user registration, login, logout, and protected routes.

## Features

- ✅ User registration with email validation
- ✅ User login with session management
- ✅ Protected routes for authenticated users
- ✅ Logout functionality
- ✅ Persistent sessions (localStorage)
- ✅ Auth context for global state management
- ✅ Responsive UI for mobile and desktop

## File Structure

```
/context
  └── AuthContext.tsx          # Authentication context & provider
/components
  ├── Login.tsx               # Login page
  ├── Register.tsx            # Registration page
  ├── ProtectedRoute.tsx       # Route protection wrapper
  └── Navbar.tsx              # Updated with auth UI
/services
  ├── authService.ts          # Auth API service (ready for backend integration)
  └── geminiService.ts        # Existing Gemini service
/hooks
  └── useNavigate.ts          # Simple hash-based routing
App.tsx                        # Main app with routing logic
```

## Usage

### 1. Authentication Context

The `AuthContext` provides authentication state and methods throughout the app:

```tsx
import { useAuth } from './context/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome {user?.name}</div>;
};
```

### 2. Login Component

Navigate to `#/login` to access the login page. Users can:
- Enter email and password
- Create new account link
- Error handling and validation

### 3. Register Component

Navigate to `#/register` to access the registration page. Users can:
- Create new account with name, email, password
- Password confirmation
- Email format validation
- Link to login page

### 4. Protected Routes

Wrap components that require authentication:

```tsx
import ProtectedRoute from './components/ProtectedRoute';

<ProtectedRoute>
  <YourProtectedComponent />
</ProtectedRoute>
```

Users not logged in will see a login prompt.

### 5. Navigation

The app uses hash-based routing (#/path):

- `#/` - Home page
- `#/login` - Login page
- `#/register` - Registration page
- `#/dashboard` - Protected dashboard (requires login)

## Navbar Authentication UI

The Navbar automatically displays:

**When logged in:**
- User's name
- Logout button

**When not logged in:**
- Login button
- Register button

Mobile menu also includes these options.

## Session Management

### Storing Sessions

User data and auth token are stored in localStorage:

```javascript
localStorage.getItem('user')      // User object
localStorage.getItem('authToken') // Auth token
```

### Clearing Sessions

Sessions are cleared on logout:

```javascript
localStorage.removeItem('user');
localStorage.removeItem('authToken');
```

## Backend Integration

### Current Implementation

Currently using localStorage with mock API calls. To integrate with a real backend:

### Steps:

1. **Update `authService.ts`** - Replace mock implementations with actual API calls:

```typescript
export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
  // ... other methods
};
```

2. **Add environment variables** to `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

3. **Update `AuthContext.tsx`** to use the service:

```typescript
import { authService } from '../services/authService';

const login = async (email: string, password: string) => {
  const response = await authService.login({ email, password });
  setUser(response.user);
  localStorage.setItem('user', JSON.stringify(response.user));
  localStorage.setItem('authToken', response.token);
};
```

4. **Use HTTP-only cookies** for production (more secure than localStorage):

```typescript
// Backend should set secure, httpOnly cookie
// Frontend doesn't need to store token
```

## Security Best Practices

### Current (Development)
- ✅ Local storage for session management
- ✅ Client-side validation
- ⚠️ Mock API endpoints

### For Production
- 🔒 Use HTTP-only secure cookies
- 🔒 Implement HTTPS only
- 🔒 Add CSRF protection
- 🔒 Validate all inputs server-side
- 🔒 Implement rate limiting
- 🔒 Use JWT tokens with expiration
- 🔒 Implement refresh token rotation
- 🔒 Add password reset functionality
- 🔒 Implement email verification
- 🔒 Add 2FA/MFA support

## Styling

All auth components use the existing color scheme:
- Primary: `#0D3156` (dark blue)
- Accent: `#FFC600` (yellow)
- Secondary: `#4A6278` (slate blue)

## Form Validation

### Login
- Email required
- Password required

### Register
- Name required
- Email required and valid format
- Password required (minimum 6 characters)
- Password confirmation must match

## Error Handling

All forms display error messages in a styled alert box:

```tsx
{error && (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
    {error}
  </div>
)}
```

## Testing Authentication

### Manual Testing

1. **Register** - Click "S'inscrire" button
   - Fill in name, email, password
   - Confirm password
   - Click "S'inscrire"

2. **Verify Session** - Refresh page
   - User should remain logged in
   - Navbar should show username and logout button

3. **Logout** - Click logout button
   - User should be cleared
   - Navbar should show login/register buttons

4. **Access Protected Route** - Try navigating to `#/dashboard`
   - When logged out: Should show login prompt
   - When logged in: Should show dashboard

## API Endpoints (Ready for Implementation)

When backend is ready, implement these endpoints:

```
POST   /api/auth/login       - Login user
POST   /api/auth/register    - Register new user
POST   /api/auth/logout      - Logout user
GET    /api/auth/verify      - Verify token
POST   /api/auth/refresh     - Refresh token
POST   /api/auth/reset       - Reset password
```

## Troubleshooting

### User not staying logged in
- Check if localStorage is enabled
- Check browser console for errors
- Verify user data is being stored correctly

### Login/Register not working
- Check network tab in developer tools
- Verify form validation passes
- Check console for error messages

### Protected routes not working
- Ensure user is logged in (check localStorage)
- Verify route path is correct (hash-based: #/path)
- Check console for AuthContext errors

## Future Enhancements

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social login (Google, Facebook)
- [ ] User profile management
- [ ] Session timeout warning
- [ ] Activity logging
- [ ] Account deletion
