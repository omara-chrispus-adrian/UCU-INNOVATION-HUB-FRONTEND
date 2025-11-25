# UCU Innovators Hub - Implementation Guide

## Quick Start Guide

### 1. Running the Application

```bash
# Navigate to project directory
cd UCU-INNOVATION-HUB-FRONT

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will start at `http://localhost:5173`

### 2. Testing Different User Roles

#### Login as Student

1. Click **Login** button
2. Enter any email (e.g., `student@ucu.ac.ug`)
3. Enter password (minimum 6 characters)
4. Select **Student** from role dropdown
5. Click **Login**
6. You'll be redirected to Student Dashboard

#### Login as Supervisor

1. Follow same steps
2. Select **Supervisor** from role dropdown
3. You'll be redirected to Supervisor Dashboard

#### Login as Administrator

1. Follow same steps
2. Select **Admin** from role dropdown
3. You'll be redirected to Admin Dashboard

### 3. Key User Workflows

#### Student Workflow

1. **Register** → Enter personal details, select Student role
2. **View Dashboard** → See projects and stats
3. **Submit Project** → Click "New Project" button
4. **Fill Form**:
   - Project Title
   - Description
   - Category (Web, Mobile, IoT, AI/ML, Other)
   - Technologies (comma-separated)
   - GitHub Link (optional)
   - PDF Document (optional)
5. **Track Status** → View project status (Pending, Approved)
6. **Logout** → Click logout button

#### Supervisor Workflow

1. **Login** as Supervisor
2. **View Dashboard** → See pending projects list
3. **Select Project** → Click on project to review
4. **Add Comments** → Provide feedback in comment section
5. **Approve/Reject** → Choose action button
6. **Track Changes** → View status updates in recent activity

#### Admin Workflow

1. **Login** as Administrator
2. **Analytics Tab** → View dashboard with charts and statistics
3. **User Management Tab** → View all users, activate/deactivate
4. **Categories Tab** → Manage project categories
5. **Export Data** → Generate reports (future feature)

### 4. File Navigation

#### After Login

- **Student**: `/dashboard/student`
- **Supervisor**: `/dashboard/supervisor`
- **Admin**: `/dashboard/admin`

#### Public Pages

- **Home/Gallery**: `/` (accessible without login)
- **Login**: `/login`
- **Register**: `/register`

## Component Architecture

### Pages (src/pages/)

```
Login.jsx
  ├── Form inputs
  ├── Validation
  ├── Role selection
  └── Authentication integration

StudentDashboard.jsx
  ├── Stats section
  ├── Project list grid
  ├── New project form
  └── Project management

SupervisorDashboard.jsx
  ├── Stats section
  ├── Projects list (sidebar)
  ├── Project detail section
  ├── Comments section
  └── Approval buttons

AdminDashboard.jsx
  ├── Navigation tabs
  ├── Analytics section
  │   ├── Stat cards
  │   └── Charts/graphs
  ├── User management table
  └── Category management

PublicGallery.jsx
  ├── Header with login links
  ├── Filter sidebar
  ├── Projects grid
  └── Detail modal
```

### Context (src/context/)

```
AuthContext.jsx
  ├── User state
  ├── Authentication state
  ├── Login function
  ├── Register function
  ├── Logout function
  └── localStorage integration
```

### Components (src/components/)

```
ProtectedRoute.jsx
  ├── Authentication check
  ├── Role validation
  └── Redirect logic
```

## State Management

### Auth Context

```javascript
// Current User
user = {
  id,
  firstName,
  lastName,
  email,
  name,
  role,
  faculty,
  studentId,
};

// Auth State
isAuthenticated = boolean;
userRole = "student" | "supervisor" | "admin";
loading = boolean;

// Methods
login(userData, token);
register(userData, token);
logout();
```

### Component Local State

- Form inputs
- Project lists
- Selected project details
- Filter values
- UI toggles (modals, tabs, etc.)

## CSS Organization

### Global Styles (index.css)

- Reset and defaults
- Color variables
- Typography
- Global utilities

### Page-Specific Styles

- **Auth.css** - Login and Register pages
- **Dashboard.css** - Student, Supervisor, Admin dashboards
- **Gallery.css** - Public gallery page

### Styling Approach

- BEM methodology for class naming
- CSS Grid and Flexbox for layouts
- CSS variables for theme colors
- Mobile-first responsive design

## Form Validation

### Login Form

- Email: Must be valid email format
- Password: Minimum 6 characters
- Role: Required selection

### Register Form

- First Name: Required
- Last Name: Required
- Email: Valid email format
- Password: Minimum 6 characters
- Confirm Password: Must match password
- Student ID: Required if role is Student
- Faculty: Required selection

### Project Form

- Title: Required
- Description: Required
- Category: Required
- Technologies: Required (comma-separated)
- GitHub Link: Optional (must be valid URL if provided)
- Document: Optional (must be PDF)

## API Integration Points

Currently using mock data. To integrate with backend:

### Authentication Endpoints

```javascript
// Replace mock in Login.jsx
POST / api / auth / login;
Body: {
  email, password, role;
}
Response: {
  user, token;
}

POST / api / auth / register;
Body: {
  firstName, lastName, email, password, role, faculty, studentId;
}
Response: {
  user, token;
}
```

### Project Endpoints

```javascript
// Student Dashboard
GET /api/projects/my-projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id

// Supervisor Dashboard
GET /api/projects/pending
PUT /api/projects/:id/approve
PUT /api/projects/:id/reject
POST /api/projects/:id/comments

// Admin Dashboard
GET /api/analytics
GET /api/users
PUT /api/users/:id
GET /api/projects/gallery
```

## Responsive Design Testing

### Desktop (> 1024px)

- Full layout with sidebars
- Multiple columns grid
- All features visible

### Tablet (768px - 1024px)

- Adjusted grid columns
- Sidebar may collapse
- Touch-friendly buttons

### Mobile (< 768px)

- Single column layouts
- Stacked sidebars
- Full-width forms
- Hamburger menus

### Testing Tools

- Browser DevTools (F12)
- Responsive Design Mode (Ctrl+Shift+M)
- Physical devices

## Performance Optimization Tips

1. **Use Code Splitting**

   ```javascript
   const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
   ```

2. **Optimize Images**

   - Use WebP format
   - Set appropriate sizes
   - Lazy load images

3. **Minimize Bundle**

   - Remove unused dependencies
   - Tree-shake unused code
   - Minimize CSS

4. **Caching**
   - Cache API responses
   - Use service workers
   - Set appropriate headers

## Debugging Tips

### Chrome DevTools

1. **Elements Tab** - Inspect HTML and CSS
2. **Console Tab** - View errors and logs
3. **Network Tab** - Monitor API calls
4. **Application Tab** - Check localStorage

### React DevTools

- Inspect component tree
- View props and state
- Track component updates

### Common Issues

**"useAuth must be used within AuthProvider"**

- Ensure AuthProvider wraps the component
- Check imports in App.jsx

**"Cannot read property of undefined"**

- Check if data is loaded before rendering
- Add null checks in render logic

**Styles not applying**

- Check CSS file is imported
- Verify class names match
- Clear browser cache

## Security Considerations

1. **Authentication**

   - Implement real JWT validation
   - Add refresh token mechanism
   - Secure token storage

2. **Data Protection**

   - HTTPS only
   - Sanitize user inputs
   - Validate on server

3. **Authorization**
   - Verify role on backend
   - Check permissions for actions
   - Implement audit logging

## Accessibility

- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliance
- Focus indicators on interactive elements

## Version Control Guidelines

### Branch Naming

- `feature/feature-name`
- `bugfix/bug-description`
- `hotfix/critical-issue`

### Commit Messages

```
[FEATURE] Add student dashboard
[BUGFIX] Fix login validation error
[DOCS] Update README
[STYLE] Improve responsive design
```

## Deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Lighthouse score > 85
- [ ] Mobile responsive verified
- [ ] API endpoints configured
- [ ] Environment variables set
- [ ] Build completes without errors
- [ ] Production build tested
- [ ] Security audit completed
- [ ] Performance optimized

## Environment Variables

Create `.env` file in project root:

```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=UCU Innovators Hub
VITE_ENV=development
```

## Helpful Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Happy Coding! 🚀**

For questions or issues, refer to PROJECT_DOCUMENTATION.md or contact the development team.
