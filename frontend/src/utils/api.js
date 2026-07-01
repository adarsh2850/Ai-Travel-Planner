import axios from 'axios';

let BASE_URL = import.meta.env.VITE_API_URL || 'https://ai-travel-planner-f6b3.onrender.com/api';

// Auto-append '/api' if it's missing from the configured environment URL
if (BASE_URL && !BASE_URL.endsWith('/api') && !BASE_URL.endsWith('/api/')) {
  BASE_URL = BASE_URL.replace(/\/$/, '') + '/api';
}

// Create axios instance with base config
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Request interceptor: attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sarthiai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 globally (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only auto-logout on 401 for protected routes, NOT for /auth/login or /auth/signup
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/signup');
      if (!isAuthRoute) {
        localStorage.removeItem('sarthiai_token');
        localStorage.removeItem('sarthiai_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth API ─────────────────────────────────────────────────
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// ── Trips API ────────────────────────────────────────────────
export const tripsAPI = {
  getAll: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  save: (tripData) => api.post('/trips', tripData),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
  toggleBookmark: (id) => api.post(`/trips/${id}/bookmark`),
  clearAll: () => api.delete('/trips'),
};

// ── Chat API ─────────────────────────────────────────────────
export const chatAPI = {
  sendMessage: (message, currentItinerary) =>
    api.post('/chat/message', { message, currentItinerary }),
};

// ── Weather API ──────────────────────────────────────────────
export const weatherAPI = {
  getWeather: (city) => api.get(`/weather?city=${encodeURIComponent(city)}`),
};

// ── Images API ───────────────────────────────────────────────
export const imagesAPI = {
  search: (query) => api.get(`/images/search?query=${encodeURIComponent(query)}`),
};

// ── Config API ───────────────────────────────────────────────
export const configAPI = {
  getPublicConfig: () => api.get('/config'),
};

// Health check
export const checkHealth = () => api.get('/health');

export default api;
