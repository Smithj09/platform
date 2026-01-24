# Admin Dashboard Testing Guide

## Getting Started

### 1. Start the Application

```bash
npm run dev
```

Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### 2. Login as Admin

**URL**: `#/login`

**Credentials:**
- Email: `admin@adinnovation.com`
- Password: `admin123`

After clicking "Se connecter", you'll be logged in as admin.

## Testing Steps

### Step 1: Verify Admin Button Appears

After login:
1. Look at the navbar (top of page)
2. You should see:
   - Your name
   - **"Admin" button** (blue colored)
   - "Déconnexion" (logout) button

**Desktop**: All buttons are visible in the top right
**Mobile**: Menu icon shows these options

### Step 2: Access Admin Panel

1. Click the "Admin" button in navbar
2. You should be redirected to `/admin`
3. Page should load with admin dashboard

### Step 3: Explore Overview Tab

The overview tab shows:

1. **Statistics Cards** (4 cards):
   - 👥 Utilisateurs Totaux: 24
   - 📋 Projets Totaux: 156
   - ⚡ Projets Actifs: 42
   - 💰 Revenus Totaux: $125,450

2. **Recent Activity Section**:
   - New user signup (2 hours ago)
   - New project created (5 hours ago)
   - Payment received (1 day ago)
   - User logged in (1 day ago)

**Test**: Scroll down to see all content

### Step 4: Test User Management Tab

1. Click the "👥 Utilisateurs" tab
2. You should see a user table with:
   - Admin User (admin@adinnovation.com)
   - Role: Admin (yellow badge)
   - Created: 2025-01-01
   - Last Login: 2025-01-25

3. **Test Buttons**:
   - Click "Retirer" to revoke admin (role changes to User)
   - Click "Admin" to restore admin privileges
   - Click "Supprimer" to remove the user

4. **Add User Button**:
   - Click "+ Ajouter Utilisateur" (button available at top)

### Step 5: Test Analytics Tab

1. Click the "📈 Analytique" tab
2. You should see 4 sections:
   - User Growth Chart (with +15% indicator)
   - Revenue Chart (with +22% indicator)
   - Project Distribution (pie chart with percentages)
   - Top Services (ranking by views)

3. **Test Charts**:
   - Verify colors are correct
   - Check all data displays
   - Verify percentages show correctly

### Step 6: Test Settings Tab

1. Click the "⚙️ Paramètres" tab
2. You should see 3 sections:

**General Settings**:
- Application Name field
- Support Email field
- Both have example values

**Email Settings**:
- Checkbox: Enable email notifications (checked)
- Checkbox: Send weekly reports (checked)

**Security**:
- Button: "Réinitialiser Mot de Passe"

3. **Test Functionality**:
   - Try changing application name
   - Try changing email
   - Toggle checkboxes
   - Click "Enregistrer" (save) button
   - Click "Annuler" (cancel) button

### Step 7: Test Mobile Responsiveness

1. Open browser DevTools (F12)
2. Click device toggle (mobile view icon)
3. Set width to iPhone/iPad size
4. Test that:
   - Admin button appears in mobile menu
   - All tabs work on mobile
   - Tables are scrollable
   - Text is readable
   - Forms work on mobile

### Step 8: Test Logout

1. Click "Déconnexion" button
2. You should be logged out
3. Navbar should show "Connexion" and "S'inscrire" buttons
4. Navigate to `#/admin`
5. You should see "Accès Administrateur Requis" message

### Step 9: Test Admin Route Protection

1. While logged out, try accessing `#/admin`
2. You should see error message:
   - "Accès Administrateur Requis"
   - "Vous n'avez pas les permissions..."
   - "Retour à l'accueil" button

3. Login with regular user account:
   - Go to `#/register`
   - Create: testuser@test.com / Test User / password123
   - Try accessing `#/admin`
   - Same error message should appear

4. Login again as admin to confirm access

### Step 10: Test User Promotion

1. Create a regular user (register new account)
2. Go to Admin Panel → Users tab
3. Find the new user (should show "Utilisateur" role)
4. Click "Admin" button
5. User role should change to "Admin"
6. Logout and login with that user
7. "Admin" button should appear in navbar

## Responsive Design Testing

### Desktop (1920px)
- All content visible
- Buttons properly spaced
- Tables show all columns
- Charts display clearly

### Tablet (768px)
- Two column grid for stats
- Table might need horizontal scroll
- All buttons accessible
- Charts resize properly

### Mobile (375px)
- One column for stats
- Menu hamburger icon
- Admin option in mobile menu
- Forms stack vertically
- Table horizontal scroll
- Full-width buttons

## Browser Testing

Test in different browsers:

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Performance Testing

1. Open DevTools → Network tab
2. Reload page
3. Check that:
   - Page loads in < 2 seconds
   - No failed requests
   - All assets load properly

## Functionality Testing Checklist

### Authentication
- [ ] Admin login works
- [ ] Regular user can't access admin
- [ ] Logout works
- [ ] Session persists on refresh

### Dashboard
- [ ] Overview tab displays stats
- [ ] Activity feed shows recent actions
- [ ] All four cards visible
- [ ] Proper styling and colors

### User Management
- [ ] User list displays
- [ ] Admin/User badges show correctly
- [ ] Promote user to admin works
- [ ] Demote user works
- [ ] Delete user works
- [ ] Create user button present

### Analytics
- [ ] All 4 chart sections visible
- [ ] Growth percentages display
- [ ] Project distribution shows
- [ ] Services list displays
- [ ] Charts have proper colors

### Settings
- [ ] Text inputs work
- [ ] Checkboxes toggle
- [ ] Save button present
- [ ] Cancel button present
- [ ] Values can be changed

### Navigation
- [ ] Tab switching works
- [ ] URL updates correctly
- [ ] Mobile menu works
- [ ] Admin button visible
- [ ] Logout button works

## Common Issues & Solutions

### Issue: "Admin" button not appearing

**Solution:**
1. Check if user is logged in
2. Check localStorage → look for `user` key
3. Check if `isAdmin: true` in user object
4. Refresh page
5. Clear localStorage and login again

### Issue: Can't access admin panel

**Solution:**
1. Make sure you're logged in as admin
2. Check URL is `#/admin`
3. Check browser console for errors (F12)
4. Verify `isAdmin` property in localStorage user

### Issue: Settings changes not saving

**Solution:**
1. This is expected (local demo)
2. To persist, implement backend API
3. See BACKEND_INTEGRATION_EXAMPLE.md

### Issue: User deletion doesn't work

**Solution:**
1. Check browser console for errors
2. Verify localStorage user array exists
3. Make sure you're deleting the correct user ID

### Issue: Mobile menu not showing admin

**Solution:**
1. Check if `isOpen` state is true
2. Verify mobile styles are applied (md: hidden)
3. Check navbar component for proper condition

## Testing Admin Features

### Create Test Users

1. Register multiple users:
   - user1@test.com
   - user2@test.com
   - user3@test.com

2. Promote some to admin

3. Test promoting/demoting

4. Test deleting users

### Test Analytics

1. View the analytics dashboard
2. Check all charts display
3. Verify percentages
4. Check color consistency

### Test Settings

1. Change application name
2. Change support email
3. Toggle email preferences
4. Try saving/canceling

## Automated Testing Ideas

For future implementation:

```typescript
// Example test cases
describe('Admin Panel', () => {
  test('should require admin authentication', () => {
    // Test protected route
  });

  test('should display user list', () => {
    // Test user table rendering
  });

  test('should allow promoting user to admin', () => {
    // Test admin promotion
  });

  test('should allow deleting user', () => {
    // Test user deletion
  });

  test('should display analytics', () => {
    // Test analytics display
  });
});
```

## Final Testing Checklist

After completing all tests:

- [ ] All tabs load correctly
- [ ] All buttons work as expected
- [ ] Responsive design works on all devices
- [ ] Colors and styling match brand
- [ ] Admin authentication works
- [ ] No console errors
- [ ] Navigation smooth and intuitive
- [ ] Forms validate properly
- [ ] Analytics display correctly
- [ ] Mobile menu functions

## Success Criteria

Your admin panel is working correctly when:

✅ You can login as admin
✅ Admin button appears in navbar
✅ Admin panel loads at `/admin`
✅ All tabs are accessible
✅ User management works
✅ Analytics display data
✅ Settings can be configured
✅ Mobile menu works
✅ Logout works properly

---

**Testing Complete!** ✅

Your admin dashboard is fully functional and ready for use. See [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md) for more information about features and best practices.
