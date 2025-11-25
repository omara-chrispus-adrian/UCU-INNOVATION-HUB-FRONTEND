# UCU Innovators Hub - Frontend Application

## Project Overview

UCU Innovators Hub is a web-based repository application designed to serve as a centralized platform for documenting, showcasing, and managing all local projects and innovations created by students at Uganda Christian University (UCU).

### Key Features

- **User Authentication**: Role-based login system for Students, Supervisors, and Administrators
- **Project Submission**: Students can submit project details with documentation and GitHub links
- **Project Review System**: Supervisors can review, approve, or reject submissions with comments
- **Analytics Dashboard**: Administrators can view insights into project submissions, approval rates, and trending technologies
- **Public Gallery**: Browse and filter approved projects by faculty, category, and technology
- **Responsive Design**: Fully responsive interface optimized for desktop and mobile devices

## Technology Stack

- **Framework**: React 19.2.0
- **Routing**: React Router DOM 6.23.0
- **HTTP Client**: Axios 1.6.5
- **Visualization**: Chart.js 4.4.1 with React-ChartJS-2
- **Build Tool**: Vite 7.2.4
- **Styling**: Pure CSS with responsive design

## Project Structure

```
src/
├── pages/                 # Page components for different routes
│   ├── Login.jsx          # User login page
│   ├── Register.jsx       # User registration page
│   ├── StudentDashboard.jsx        # Student dashboard with project management
│   ├── SupervisorDashboard.jsx     # Supervisor dashboard for project review
│   ├── AdminDashboard.jsx          # Admin dashboard with analytics
│   └── PublicGallery.jsx   # Public project gallery and browsing
├── components/            # Reusable components
│   └── ProtectedRoute.jsx  # Route protection based on authentication
├── context/               # React Context for state management
│   └── AuthContext.jsx     # Authentication state and user management
├── styles/                # CSS stylesheets
│   ├── Auth.css           # Authentication pages styles
│   ├── Dashboard.css      # Dashboard pages styles
│   └── Gallery.css        # Public gallery styles
├── utils/                 # Utility functions
├── App.jsx                # Main app component with routing
├── main.jsx               # React entry point
└── index.css              # Global styles

public/
└── index.html             # HTML template

package.json              # Project dependencies and scripts
vite.config.js            # Vite configuration
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone/Navigate to the project directory**:

   ```bash
   cd UCU-INNOVATION-HUB-FRONT
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Access the application**:
   - The application will be available at `http://localhost:5173` (or the URL shown in terminal)

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Page Documentation

### 1. Public Gallery (`/`)

- **Purpose**: Browse approved projects without authentication
- **Features**:
  - Filter by Faculty, Category, and Technology
  - Search functionality
  - Project detail modal
  - Login/Register links for authenticated users
- **Components**: Search bar, Filter sidebar, Project grid, Modal
- **Responsive**: Yes

### 2. Login Page (`/login`)

- **Purpose**: Authenticate existing users
- **Features**:
  - Email and password validation
  - Role selection (Student, Supervisor, Admin)
  - Error handling
  - Redirect to registration page
- **Form Validation**: Email format, Password length
- **Responsive**: Yes

### 3. Register Page (`/register`)

- **Purpose**: Create new user accounts
- **Features**:
  - Complete user information capture
  - Role-based registration
  - Faculty selection
  - Student ID for students
  - Password confirmation
- **Form Validation**: All fields required, password matching, email format
- **Responsive**: Yes

### 4. Student Dashboard (`/dashboard/student`)

- **Purpose**: Manage student projects
- **Features**:
  - View all submitted projects
  - Submit new projects (with title, description, category, technologies, GitHub link, PDF)
  - View project status (Approved, Pending, Rejected)
  - Statistics: Total projects, Approved count, Pending count
  - Edit and delete projects (if rejected)
- **Protected**: Yes - Requires student role
- **Responsive**: Yes

### 5. Supervisor Dashboard (`/dashboard/supervisor`)

- **Purpose**: Review and approve/reject student projects
- **Features**:
  - View pending projects list
  - Project detail view
  - Add comments and feedback
  - Approve or reject projects
  - View submission dates
  - Statistics: Pending, Approved, Rejected counts
  - Recent activity view
- **Protected**: Yes - Requires supervisor role
- **Responsive**: Yes

### 6. Admin Dashboard (`/dashboard/admin`)

- **Purpose**: Manage users and view analytics
- **Features**:
  - **Analytics Tab**:
    - Total projects, approval rates
    - Projects by faculty (bar chart)
    - User distribution (students, supervisors, admins)
    - Trending technologies
    - Monthly submission trends
    - Project status overview
  - **User Management Tab**:
    - View all users
    - Activate/Deactivate users
    - Filter by role and faculty
  - **Categories Tab**:
    - View project categories
    - Edit categories
    - Add new categories
- **Protected**: Yes - Requires admin role
- **Responsive**: Yes

## Authentication System

### Context: AuthContext.jsx

- Manages user authentication state
- Stores user data and JWT tokens in localStorage
- Provides login, register, and logout methods
- Persists session on page refresh

### Protected Routes

- Routes are protected using `ProtectedRoute` component
- Redirects unauthenticated users to login page
- Redirects users to login if accessing role-restricted pages
- Includes role-based access control (RBAC)

### Mock Authentication

- Currently uses mock authentication (no backend)
- Users can login with any email/password (minimum 6 characters)
- Real authentication can be implemented by replacing mock calls with API endpoints

## Styling

### Color Scheme

- **Primary**: #667eea (Purple Blue)
- **Secondary**: #764ba2 (Purple)
- **Background**: #f5f7fa (Light Gray)
- **Text**: #333 (Dark Gray)
- **Success**: #28a745 (Green)
- **Warning**: #ffc107 (Yellow)
- **Danger**: #dc3545 (Red)

### Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

### Design Principles

- Clean and modern interface
- Consistent color scheme and typography
- Accessible form elements and buttons
- Smooth transitions and hover effects
- Mobile-first responsive design

## Data Models (Mock Data)

### User Object

```javascript
{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  name: string,
  role: 'student' | 'supervisor' | 'admin',
  faculty: string,
  studentId?: string
}
```

### Project Object

```javascript
{
  id: number,
  title: string,
  description: string,
  status: 'pending' | 'approved' | 'rejected',
  category: string,
  technologies: string[],
  teamMembers: string[],
  submissionDate: string,
  approvalDate?: string,
  githubLink: string,
  documentPath?: string
}
```

### Analytics Object

```javascript
{
  totalProjects: number,
  approvedProjects: number,
  pendingProjects: number,
  totalUsers: number,
  studentCount: number,
  supervisorCount: number,
  projectsByFaculty: Array,
  trendingTechnologies: Array,
  projectsByMonth: Array
}
```

## Features Implemented

### Phase 1: Core Functionality ✅

- [x] User authentication (Login/Register)
- [x] Role-based access control
- [x] Project submission interface
- [x] Project listing and viewing
- [x] Basic navigation between pages

### Phase 2: Advanced Features ✅

- [x] Project filtering and search
- [x] Analytics dashboard
- [x] User management
- [x] Comments and feedback system
- [x] Status tracking (Approved, Pending, Rejected)

### Phase 3: User Experience ✅

- [x] Responsive mobile design
- [x] Form validation
- [x] Error handling
- [x] Consistent styling
- [x] Smooth transitions and animations

## Future Enhancements

1. **Backend Integration**

   - Replace mock authentication with real API
   - Implement persistent database
   - Set up secure JWT authentication

2. **Additional Features**

   - File upload for project documents
   - Email notifications
   - Advanced analytics with real-time data
   - Project collaboration features
   - Version history for projects

3. **Performance Optimization**

   - Code splitting
   - Lazy loading for routes
   - Image optimization
   - Caching strategies

4. **Security Enhancements**
   - HTTPS enforcer
   - CSRF protection
   - Rate limiting
   - Input sanitization

## Testing

### Manual Testing Checklist

- [ ] Login with different roles
- [ ] Register new account
- [ ] Submit projects
- [ ] Filter and search projects
- [ ] Approve/Reject projects with comments
- [ ] View analytics and statistics
- [ ] Test responsive design on mobile
- [ ] Test form validation
- [ ] Test protected routes

### Testing Credentials (Mock)

- **Email**: any email format (e.g., test@ucu.ac.ug)
- **Password**: minimum 6 characters
- **Role**: Select from dropdown (Student, Supervisor, Admin)

## Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deployment Platforms

- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- Traditional hosting with static server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Metrics

- Initial Load Time: < 3 seconds
- Time to Interactive: < 5 seconds
- Lighthouse Score Target: > 85

## Troubleshooting

### Issue: Port 5173 already in use

```bash
npm run dev -- --port 3000
```

### Issue: Module not found errors

```bash
npm install
npm run dev
```

### Issue: Hot reload not working

- Check if all files are saved
- Restart the dev server
- Clear browser cache (Ctrl+Shift+Delete)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of Uganda Christian University's academic assessment.

## Contact & Support

For issues or questions, contact the development team at the Department of Computing & Technology.

---

**Project Version**: 1.0.0  
**Last Updated**: November 25, 2025  
**Status**: Development Complete (MVP)
