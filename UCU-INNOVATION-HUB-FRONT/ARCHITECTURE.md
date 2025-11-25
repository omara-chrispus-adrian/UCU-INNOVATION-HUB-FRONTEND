# UCU Innovators Hub - Architecture & Diagrams

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     UCU INNOVATORS HUB                          │
│                      FRONTEND (React)                           │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                         ROUTING LAYER                            │
│         (React Router v6 - Client-side Navigation)              │
├──────────────────────────────────────────────────────────────────┤
│ / → PublicGallery │ /login → Login │ /register → Register       │
│ /dashboard/student → StudentDashboard                           │
│ /dashboard/supervisor → SupervisorDashboard                     │
│ /dashboard/admin → AdminDashboard                               │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                     PROTECTION LAYER                            │
│               (ProtectedRoute Component)                        │
├──────────────────────────────────────────────────────────────────┤
│  ┌─ Authentication Check                                       │
│  ├─ Role Validation                                            │
│  ├─ Redirect to Login (if not authenticated)                   │
│  └─ Redirect to Home (if insufficient permissions)             │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT LAYER                       │
│                  (React Context API)                            │
├──────────────────────────────────────────────────────────────────┤
│  AuthContext                                                    │
│  ├─ user: Current user object                                  │
│  ├─ isAuthenticated: Boolean flag                              │
│  ├─ userRole: String (student|supervisor|admin)                │
│  ├─ login(): Authenticate user                                 │
│  ├─ register(): Create new user                                │
│  └─ logout(): Clear authentication                             │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                      PAGES LAYER                                │
│                   (UI Components)                               │
├──────────────────────────────────────────────────────────────────┤
│  PUBLIC PAGES          │  PROTECTED PAGES (by role)             │
│  ─────────────────────┼─────────────────────────────────────  │
│  ├─ PublicGallery     │  ├─ StudentDashboard                  │
│  ├─ Login             │  ├─ SupervisorDashboard               │
│  └─ Register          │  └─ AdminDashboard                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                   COMPONENTS LAYER                              │
│              (Reusable UI Components)                           │
├──────────────────────────────────────────────────────────────────┤
│  ├─ ProtectedRoute: Route protection wrapper                   │
│  ├─ Forms: Login, Register, ProjectSubmission                  │
│  ├─ Cards: StatCard, ProjectCard, UserCard                     │
│  ├─ Tables: UserTable, ProjectTable                            │
│  ├─ Modals: ProjectDetail, Feedback                            │
│  ├─ Charts: Faculty Distribution, Technology Trends            │
│  └─ Filters: Search, Category, Faculty, Technology             │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                   STYLING LAYER                                 │
│                  (CSS + CSS Variables)                          │
├──────────────────────────────────────────────────────────────────┤
│  Global Styles (index.css)                                      │
│  ├─ Auth.css (Login/Register)                                  │
│  ├─ Dashboard.css (All dashboards)                             │
│  └─ Gallery.css (Public gallery)                               │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                    DATA FLOW LAYER                              │
│           (Mock Data + Future API Integration)                  │
├──────────────────────────────────────────────────────────────────┤
│  Users → Projects → Comments → Analytics                       │
│  All currently in-memory; Will be replaced with API calls      │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
USER INTERACTION
       ↓
   FORM INPUT
       ↓
VALIDATION CHECK ← Failed → Show Error Message
       │                          ↑
       ↓ Success                  │
  STATE UPDATE                    │
       ↓                          │
 CONTEXT UPDATE                   │
       ↓                          │
 COMPONENT RE-RENDER              │
       ↓                          │
  DISPLAY UPDATE ───────────────→ User sees result
       ↓
 PERSIST DATA (localStorage)
```

## Authentication Flow

```
USER VISITS APP
      ↓
CHECK localStorage FOR TOKEN
      ├─ Token Found → Restore Session
      │                    ↓
      │              Set isAuthenticated = true
      │                    ↓
      │              Redirect to Dashboard
      │
      └─ No Token → Show Login/Register
                          ↓
                    USER SUBMITS FORM
                          ↓
                    VALIDATE INPUT
                          ├─ Invalid → Show Errors
                          │
                          └─ Valid
                                ↓
                          MOCK AUTH CHECK
                                ↓
                          GENERATE USER OBJECT
                                ↓
                          GENERATE JWT TOKEN
                                ↓
                          CALL login() in Context
                                ↓
                          STORE IN localStorage
                                ↓
                          UPDATE CONTEXT STATE
                                ↓
                          REDIRECT TO DASHBOARD
```

## Component Hierarchy

```
App.jsx (Router)
│
├─ PublicGallery
│  ├─ Header
│  ├─ FilterSidebar
│  └─ ProjectGrid
│     └─ ProjectCard
│        └─ ProjectModal
│
├─ Login
│  └─ AuthForm
│
├─ Register
│  └─ AuthForm (Extended)
│
├─ StudentDashboard
│  ├─ DashboardHeader
│  ├─ StatCards
│  ├─ ProjectSubmissionForm
│  └─ ProjectGrid
│     └─ ProjectCard
│
├─ SupervisorDashboard
│  ├─ DashboardHeader
│  ├─ StatCards
│  ├─ ProjectList (Sidebar)
│  │  └─ ProjectItem
│  └─ ProjectDetail
│     ├─ ProjectInfo
│     ├─ CommentSection
│     └─ ActionButtons
│
└─ AdminDashboard
   ├─ DashboardHeader
   ├─ NavigationTabs
   ├─ AnalyticsView
   │  ├─ StatCards
   │  └─ ChartCards
   │     ├─ BarChart
   │     ├─ PieChart
   │     └─ LineChart
   ├─ UserManagementView
   │  └─ UserTable
   └─ CategoryManagementView
      └─ CategoryGrid
```

## User Role & Access Control

```
┌─────────────────────────────────────────────────────────────────┐
│                    ROLE-BASED ACCESS CONTROL                   │
├─────────────────────────────────────────────────────────────────┤

STUDENT (student)
├─ Can Access
│  ├─ /dashboard/student (Own dashboard)
│  ├─ / (Public gallery - read-only)
│  └─ /login, /register (Auth pages)
├─ Features
│  ├─ ✓ Submit projects
│  ├─ ✓ View own projects
│  ├─ ✓ View approval status
│  ├─ ✗ Cannot review projects
│  └─ ✗ Cannot access admin panel
└─ Restrictions
   └─ Cannot access supervisor or admin dashboards

SUPERVISOR (supervisor)
├─ Can Access
│  ├─ /dashboard/supervisor (Review dashboard)
│  ├─ / (Public gallery - read-only)
│  └─ /login, /register (Auth pages)
├─ Features
│  ├─ ✓ View pending projects
│  ├─ ✓ Add comments
│  ├─ ✓ Approve projects
│  ├─ ✓ Reject projects
│  ├─ ✗ Cannot submit projects
│  └─ ✗ Cannot access admin panel
└─ Restrictions
   └─ Cannot access student or admin dashboards

ADMIN (admin)
├─ Can Access
│  ├─ /dashboard/admin (Admin dashboard)
│  ├─ / (Public gallery - read-only)
│  └─ /login, /register (Auth pages)
├─ Features
│  ├─ ✓ View all analytics
│  ├─ ✓ Manage users
│  ├─ ✓ Manage categories
│  ├─ ✓ View all projects
│  ├─ ✗ Cannot submit projects
│  └─ ✗ Cannot review projects
└─ Restrictions
   └─ Cannot access student or supervisor features

GUEST/PUBLIC
├─ Can Access
│  ├─ / (Public gallery - read-only)
│  ├─ /login (Login page)
│  └─ /register (Register page)
├─ Features
│  ├─ ✓ Browse approved projects
│  ├─ ✓ Filter projects
│  ├─ ✓ Search projects
│  ├─ ✗ Cannot submit projects
│  ├─ ✗ Cannot review projects
│  └─ ✗ Cannot access dashboards
└─ Cannot Access
   ├─ /dashboard/* (All protected pages)
   └─ Auto-redirects to login on attempt
```

## Data Models Diagram

```
USER
├─ id: string (unique identifier)
├─ firstName: string
├─ lastName: string
├─ email: string
├─ name: string (computed: firstName + lastName)
├─ role: 'student' | 'supervisor' | 'admin'
├─ faculty: string
└─ studentId?: string (optional, required for students)

PROJECT
├─ id: number (unique identifier)
├─ title: string
├─ description: string
├─ status: 'pending' | 'approved' | 'rejected'
├─ category: string
├─ technologies: string[] (array of tech tags)
├─ teamMembers: string[] (array of names)
├─ submissionDate: string (ISO format)
├─ approvalDate?: string (optional)
├─ githubLink: string (URL)
└─ documentPath?: string (optional)

COMMENT
├─ author: string (user name)
├─ text: string
└─ date: string (ISO format)

ANALYTICS
├─ totalProjects: number
├─ approvedProjects: number
├─ pendingProjects: number
├─ rejectedProjects: number
├─ totalUsers: number
├─ studentCount: number
├─ supervisorCount: number
├─ adminCount: number
├─ approvalRate: number (percentage)
├─ projectsByFaculty: [{faculty, count}]
├─ trendingTechnologies: [{name, count}]
└─ projectsByMonth: [{month, count}]
```

## State Management Structure

```
AuthContext
│
├─ user: User | null
│  └─ Current logged-in user or null if not authenticated
│
├─ isAuthenticated: boolean
│  └─ True if user is logged in, false otherwise
│
├─ userRole: string | null
│  └─ 'student' | 'supervisor' | 'admin' | null
│
├─ loading: boolean
│  └─ True while checking authentication on mount
│
└─ Functions
   ├─ login(userData, token)
   │  ├─ Saves user and token to localStorage
   │  └─ Updates context state
   │
   ├─ register(userData, token)
   │  ├─ Same as login for new users
   │  └─ Updates context state
   │
   └─ logout()
      ├─ Clears localStorage
      └─ Resets context state
```

## Page State Examples

### StudentDashboard State

```javascript
{
  projects: [
    { id, title, status, submissionDate, ... },
    { id, title, status, approvalDate, ... }
  ],
  showSubmitForm: boolean,
  newProject: {
    title: '',
    description: '',
    category: '',
    technologies: '',
    githubLink: '',
    document: null
  }
}
```

### SupervisorDashboard State

```javascript
{
  projects: [...],
  selectedProject: null | Project,
  comment: '',
  tab: 'pending' | 'approved' | 'rejected'
}
```

### AdminDashboard State

```javascript
{
  activeTab: 'analytics' | 'users' | 'categories',
  analytics: { ... },
  users: [...],
  categories: [...]
}
```

## Responsive Design Breakpoints

```
Mobile First Approach
│
├─ Mobile (< 768px)
│  ├─ Single column layouts
│  ├─ Stacked navigation
│  ├─ Full-width forms
│  └─ Touch-optimized buttons
│
├─ Tablet (768px - 1024px)
│  ├─ 2-column layouts
│  ├─ Sidebar navigation
│  ├─ Optimized spacing
│  └─ Medium-sized cards
│
└─ Desktop (> 1024px)
   ├─ Multi-column layouts
   ├─ Top/side navigation
   ├─ Extended information
   └─ Full feature set
```

## API Integration Points (Future)

```
Current: Mock Data
Future: Real API Endpoints

Authentication
├─ POST /api/auth/login
├─ POST /api/auth/register
└─ POST /api/auth/logout

Projects
├─ GET /api/projects
├─ GET /api/projects/:id
├─ POST /api/projects
├─ PUT /api/projects/:id
├─ DELETE /api/projects/:id
├─ PUT /api/projects/:id/approve
├─ PUT /api/projects/:id/reject
└─ POST /api/projects/:id/comments

Users
├─ GET /api/users
├─ GET /api/users/:id
├─ PUT /api/users/:id
└─ DELETE /api/users/:id

Analytics
├─ GET /api/analytics
├─ GET /api/analytics/projects-by-faculty
├─ GET /api/analytics/trending-technologies
└─ GET /api/analytics/user-distribution

Gallery
├─ GET /api/projects/public
├─ GET /api/projects/public?faculty=engineering
└─ GET /api/projects/public?search=query
```

## Build & Deployment Pipeline

```
Source Code
    ↓
npm install (Install Dependencies)
    ↓
npm run lint (Code Quality Check)
    ↓
npm run build (Build Optimization)
    │
    ├─ Bundle JavaScript
    ├─ Optimize CSS
    ├─ Minify Code
    └─ Generate Static Files
    ↓
npm run preview (Local Testing)
    ↓
Deploy to:
├─ Vercel
├─ Netlify
├─ GitHub Pages
└─ Traditional Hosting
    ↓
Live Application
```

---

## Key Takeaways

1. **Modular Architecture**: Each page and component is independent
2. **Centralized State**: AuthContext manages all authentication
3. **Protected Routes**: ProtectedRoute component ensures security
4. **Responsive Design**: CSS breakpoints for all device sizes
5. **Mock Data Ready**: Easy to swap with real API calls
6. **Scalable Structure**: Easy to add new features and pages

