# UCU Innovation Hub - Backend API

Backend API for the UCU Innovation Hub application built with Node.js, Express, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure MySQL Database

1. Make sure MySQL is running on your machine
2. Create a new database:

```sql
CREATE DATABASE ucu_innovation_hub;
```

3. Update the `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ucu_innovation_hub
DB_USER=root
DB_PASSWORD=your_mysql_password_here
```

**IMPORTANT**: Replace `your_mysql_password_here` with your actual MySQL root password.

### 3. Seed the Database

Run the seed script to create tables and populate with demo data:

```bash
npm run seed
```

This will create:
- Database tables (users, projects, comments)
- Demo users with credentials:
  - **Student**: `student@ucu.ac.ug` / `password123`
  - **Supervisor**: `supervisor@ucu.ac.ug` / `password123`
  - **Admin**: `admin@ucu.ac.ug` / `password123`
- Sample projects

### 4. Start the Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (student only)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/my-projects` - Get user's projects
- `POST /api/projects/:id/approve` - Approve project (supervisor/admin)
- `POST /api/projects/:id/reject` - Reject project (supervisor/admin)

### Analytics
- `GET /api/analytics/dashboard` - Dashboard statistics
- `GET /api/analytics/projects-by-faculty` - Projects grouped by faculty
- `GET /api/analytics/trending-technologies` - Most used technologies
- `GET /api/analytics/approval-rates` - Approval statistics

### Users
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id/role` - Update user role (admin only)

### Comments
- `GET /api/comments/:projectId` - Get comments for project
- `POST /api/comments` - Create comment

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ucu_innovation_hub
DB_USER=root
DB_PASSWORD=your_password_here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

## Testing the API

1. Start the backend server: `npm start`
2. Start the frontend: Navigate to `../UCU-INNOVATION-HUB-FRONT` and run `npm run dev`
3. Open the frontend in your browser
4. Login with demo credentials
5. Test the different dashboards and features

## Troubleshooting

### MySQL Connection Error

If you get "Access denied for user 'root'@'localhost'":
1. Make sure MySQL is running
2. Update `DB_PASSWORD` in `.env` with your MySQL password
3. Verify the database exists: `CREATE DATABASE ucu_innovation_hub;`

### Port Already in Use

If port 5000 is already in use:
1. Change `PORT` in `.env` to another port (e.g., 5001)
2. Update the frontend `.env` file to match: `VITE_API_URL=http://localhost:5001/api`

## Project Structure

```
UCU-INNOVATION-HUB-BACKEND/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & validation middleware
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   └── seeders/         # Database seed scripts
├── .env                 # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Dependencies
└── server.js           # Entry point
```

## License

ISC
