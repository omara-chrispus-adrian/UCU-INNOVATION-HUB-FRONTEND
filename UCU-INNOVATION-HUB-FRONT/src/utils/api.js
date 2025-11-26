import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    refreshToken: () => api.post('/auth/refresh'),
};

// Projects API
export const projectsAPI = {
    getAll: (params) => api.get('/projects', { params }),
    getById: (id) => api.get(`/projects/${id}`),
    create: (projectData) => api.post('/projects', projectData),
    update: (id, projectData) => api.put(`/projects/${id}`, projectData),
    delete: (id) => api.delete(`/projects/${id}`),
    getMyProjects: () => api.get('/projects/my-projects'),
    approve: (id, comment) => api.post(`/projects/${id}/approve`, { comment }),
    reject: (id, comment) => api.post(`/projects/${id}/reject`, { comment }),
};

// Analytics API
export const analyticsAPI = {
    getDashboard: () => api.get('/analytics/dashboard'),
    getProjectsByFaculty: () => api.get('/analytics/projects-by-faculty'),
    getTrendingTechnologies: () => api.get('/analytics/trending-technologies'),
    getApprovalRates: () => api.get('/analytics/approval-rates'),
};

// Comments API
export const commentsAPI = {
    getByProject: (projectId) => api.get(`/comments/${projectId}`),
    create: (commentData) => api.post('/comments', commentData),
};

// Users API
export const usersAPI = {
    getAll: () => api.get('/users'),
    updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
};

export default api;
