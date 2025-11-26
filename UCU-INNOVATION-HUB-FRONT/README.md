# UCU Innovators Hub - Frontend

A modern, responsive web application for showcasing and managing student innovations and research projects at Uganda Christian University.

## 🚀 Features

- **Public Project Gallery**: Browse approved projects with advanced search and filtering
- **User Authentication**: Secure JWT-based authentication with role-based access control
- **Role-Based Dashboards**:
  - **Students**: Submit and manage projects
  - **Supervisors**: Review and approve/reject project submissions
  - **Admins**: Analytics dashboard, user management, and system oversight
- **Project Management**: Complete CRUD operations for projects
- **Analytics & Insights**: Visual charts showing project statistics
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Glassmorphism effects, smooth animations, and gradient designs

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 6.23.0
- **Styling**: Tailwind CSS 3.x
- **HTTP Client**: Axios 1.6.5
- **Charts**: Chart.js 4.4.1 + React-Chartjs-2 5.2.0
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend repository)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UCU-INNOVATION-HUB-FRONT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar
│   ├── ProjectCard.jsx # Project display card
│   ├── SearchFilters.jsx # Search and filter component
│   └── ProtectedRoute.jsx # Route protection wrapper
├── context/            # React Context providers
│   └── AuthContext.jsx # Authentication state management
├── pages/              # Page components
│   ├── PublicGallery.jsx    # Public project gallery
│   ├── Login.jsx            # Login page
│   ├── Register.jsx         # Registration page
│   ├── StudentDashboard.jsx # Student dashboard
│   ├── SupervisorDashboard.jsx # Supervisor dashboard
│   └── AdminDashboard.jsx   # Admin dashboard
├── utils/              # Utility functions
│   └── api.js          # API client configuration
├── styles/             # CSS files
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Secondary**: Purple shades
- **Background**: Gradient from gray-50 via blue-50 to purple-50

### Components
- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-success`
- **Cards**: `.card`, `.card-hover`
- **Inputs**: `.input`, `.input-error`
- **Badges**: `.badge`, `.badge-pending`, `.badge-approved`, `.badge-rejected`

## 🔐 Authentication

The application uses JWT-based authentication with three user roles:

### Demo Credentials
- **Student**: `student@ucu.ac.ug` / `password123`
- **Supervisor**: `supervisor@ucu.ac.ug` / `password123`
- **Admin**: `admin@ucu.ac.ug` / `password123`

## 📱 Pages

### Public Pages
- **Home/Gallery** (`/`): Browse all approved projects
- **Login** (`/login`): User authentication
- **Register** (`/register`): New user registration

### Protected Pages
- **Student Dashboard** (`/dashboard/student`): Submit and manage projects
- **Supervisor Dashboard** (`/dashboard/supervisor`): Review project submissions
- **Admin Dashboard** (`/dashboard/admin`): Analytics and user management

## 🔌 API Integration

The frontend communicates with the backend API using Axios. API endpoints are organized in `src/utils/api.js`:

- **Auth**: Login, Register, Refresh Token
- **Projects**: CRUD operations, Approval workflow
- **Analytics**: Dashboard statistics
- **Comments**: Project feedback
- **Users**: User management

## 🚀 Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

## 🧪 Development

### Running Linter
```bash
npm run lint
```

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind utility classes
- Keep components small and focused
- Use PropTypes for type checking

## 📦 Key Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^6.23.0",
  "axios": "^1.6.5",
  "chart.js": "^4.4.1",
  "react-chartjs-2": "^5.2.0"
}
```

## 🎯 Features Roadmap

- [x] User authentication and authorization
- [x] Public project gallery
- [x] Search and filter functionality
- [x] Role-based dashboards
- [ ] Project submission with file upload
- [ ] Project approval workflow
- [ ] Comments and feedback system
- [ ] Analytics dashboard with charts
- [ ] User profile management
- [ ] Email notifications
- [ ] Export functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of the UCU academic curriculum.

## 👥 Team

Developed by UCU students for the UCU Innovators Hub project.

## 📞 Support

For support, email support@ucu.ac.ug or create an issue in the repository.
