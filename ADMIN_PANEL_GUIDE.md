# Admin Dashboard Documentation

## Overview

Your application now includes a complete admin dashboard with user management, analytics, and settings. Only administrators can access these features.

## Quick Start

### Default Admin Account

To access the admin panel:

1. **Email**: `admin@adinnovation.com`
2. **Password**: `admin123`

After login, you'll see an "Admin" button in the navbar that takes you to the dashboard.

> ⚠️ **Important**: Change these credentials immediately in production!

## Admin Features

### 1. Dashboard Overview (📊 Aperçu)

The overview tab displays key metrics:

- **Total Users**: Number of registered users
- **Total Projects**: Number of projects/installations
- **Active Projects**: Currently ongoing projects
- **Total Revenue**: Total revenue generated

#### Recent Activity Feed

Shows recent actions:
- New user signups
- New project creations
- Payments received
- User logins

### 2. User Management (👥 Utilisateurs)

Manage all users in your application:

#### Features:
- **View all users** with their details
- **Promote users to admin** - Grant admin privileges
- **Remove admin privileges** - Revoke admin access
- **Delete users** - Remove users from the system

#### User Information Displayed:
- User name
- Email address
- User role (Admin/User)
- Registration date
- Last login date

### 3. Analytics (📈 Analytique)

Comprehensive analytics dashboard showing:

#### Graphs & Charts:
- **User Growth Chart** - Track user acquisition over time
- **Revenue Chart** - Monitor monthly revenue
- **Project Distribution** - See breakdown of project types
- **Popular Services** - Most-viewed services

#### Metrics Include:
- Growth percentages
- Service popularity rankings
- Revenue trends
- Project type distribution

### 4. Settings (⚙️ Paramètres)

Configure application settings:

#### General Settings:
- Application name
- Support email address

#### Email Settings:
- Enable/disable notification emails
- Send weekly reports
- Email preferences

#### Security:
- Reset password
- Change admin credentials

## Admin Context & Hooks

### Using Admin Functions

```typescript
import { useAuth } from './context/AuthContext';

const MyComponent = () => {
  const { isAdmin, makeAdmin, removeAdmin } = useAuth();
  
  if (!isAdmin) {
    return <div>Admin access required</div>;
  }
  
  return (
    <div>
      <button onClick={() => makeAdmin('user-id')}>
        Make Admin
      </button>
    </div>
  );
};
```

### Protected Admin Routes

Wrap admin-only components:

```typescript
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

<ProtectedAdminRoute>
  <AdminPanel />
</ProtectedAdminRoute>
```

## User Roles

### Regular User
- Access personal dashboard
- View own projects
- Use calculator
- Update profile

### Admin User
- Access admin panel
- View all users
- Manage user roles
- View analytics
- Configure settings
- View activity logs

## File Structure

```
components/
├── AdminPanel.tsx         # Main admin dashboard
├── ProtectedAdminRoute.tsx # Admin route protection
├── Navbar.tsx            # Updated with admin link
└── ...

context/
└── AuthContext.tsx       # Updated with admin functions

types.ts                   # Updated with admin flag
```

## Authentication & Authorization

### Admin Check

The app checks for `isAdmin` flag on user object:

```typescript
// In AuthContext
const isAdmin: boolean = !!user?.isAdmin;
```

### Admin Routes

Routes starting with `/admin` require:
1. User to be authenticated (`isAuthenticated === true`)
2. User to have admin privileges (`isAdmin === true`)

## Customizing Admin Features

### Adding New Sections

Edit [AdminPanel.tsx](../components/AdminPanel.tsx):

```typescript
// Add new tab
{(['overview', 'users', 'analytics', 'settings', 'newTab'] as const).map(tab => (
  // ...
))}

// Add new case in renderView
case 'newtab':
  // Your custom content
  break;
```

### Styling

Admin components use your brand colors:
- Primary: `#0D3156`
- Accent: `#FFC600`
- Secondary: `#4A6278`
- Red: `#DC2626` (for danger actions)
- Blue: `#2563EB` (for info actions)

## User Management Workflow

### Promote User to Admin

1. Go to Admin Panel → Users
2. Find the user
3. Click "Admin" button
4. User now has admin privileges

### Remove Admin Privilege

1. Go to Admin Panel → Users
2. Find the admin user
3. Click "Retirer" button
4. User privileges revoked

### Delete User

1. Go to Admin Panel → Users
2. Find the user
3. Click "Supprimer" button
4. Confirm deletion
5. User removed from system

## Analytics & Reports

### Dashboard Metrics

The overview shows real-time metrics:

```
Total Users: 24
Total Projects: 156
Active Projects: 42
Total Revenue: $125,450
```

### Charts & Graphs

Visual representations of:
- User growth trends
- Revenue monthly breakdown
- Project type distribution
- Service popularity

### Exporting Data

To implement data export:

1. Add export button to analytics
2. Implement CSV/PDF generation
3. Send download to user

## Security Considerations

### Current Implementation

- ✅ Admin check on auth context
- ✅ Protected admin routes
- ⚠️ No database persistence (localStorage only)
- ⚠️ No audit logging

### For Production

- 🔒 Use secure session management
- 🔒 Implement audit logging
- 🔒 Add role-based access control (RBAC)
- 🔒 Log admin actions
- 🔒 Restrict admin creation to super-admin
- 🔒 Implement activity monitoring
- 🔒 Add IP whitelist for admin access
- 🔒 Use secure password reset flow

## Backend Integration

### Admin Endpoints (Ready for Implementation)

```
GET    /api/admin/users           - Get all users
POST   /api/admin/users/:id/admin - Make user admin
DELETE /api/admin/users/:id/admin - Remove admin
DELETE /api/admin/users/:id       - Delete user
GET    /api/admin/analytics       - Get analytics
GET    /api/admin/settings        - Get settings
PUT    /api/admin/settings        - Update settings
```

### Example API Call

```typescript
// Make user admin
async function makeUserAdmin(userId: string) {
  const response = await fetch(`/api/admin/users/${userId}/admin`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
```

## Troubleshooting

### Can't See Admin Button
- Check if user is logged in
- Check if `isAdmin` flag is `true`
- Check browser console for errors

### Can't Access Admin Panel
- Verify admin credentials
- Check localStorage for user object
- Verify `isAdmin` property exists

### Analytics Not Showing
- Check browser console for errors
- Verify data structure matches expectations
- Check if chart libraries are loaded

## Admin Permissions Matrix

| Feature | User | Admin |
|---------|------|-------|
| Access Home | ✅ | ✅ |
| View Dashboard | ✅ | ✅ |
| View Profile | ✅ | ✅ |
| Edit Profile | ✅ | ✅ |
| Access Admin Panel | ❌ | ✅ |
| View Users | ❌ | ✅ |
| Manage Users | ❌ | ✅ |
| View Analytics | ❌ | ✅ |
| Change Settings | ❌ | ✅ |
| Delete Users | ❌ | ✅ |

## Best Practices

### For Admins

1. **Change default password** immediately
2. **Monitor user activity** regularly
3. **Review analytics** weekly
4. **Update settings** as needed
5. **Create audit trail** of changes
6. **Back up data** regularly

### For Development

1. **Test admin features** thoroughly
2. **Use test accounts** for testing
3. **Log all admin actions**
4. **Implement rate limiting** for admin endpoints
5. **Use environment variables** for credentials

## Feature Requests

To add more admin features:

1. **User Profiles** - Edit user information
2. **Email Templates** - Manage email communications
3. **Payment Management** - Handle invoices and payments
4. **Report Generation** - Create PDF/CSV reports
5. **Bulk Actions** - Edit multiple users at once
6. **Activity Logs** - Audit trail of all actions
7. **Integration Settings** - Configure API keys
8. **Support Tickets** - Manage customer support

## Support & Help

For issues or questions:

1. Check browser console for errors
2. Review this documentation
3. Check [AUTH_README.md](../AUTH_README.md) for auth issues
4. Review [AUTHENTICATION_SETUP.md](../AUTHENTICATION_SETUP.md)

---

**Admin Dashboard Setup Complete!** 🎉

Your application is ready for administration. Start by logging in with the default admin credentials and explore the dashboard features.
