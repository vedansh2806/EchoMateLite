// ============================================================
// api.js – Centralized API Client Service for EchoMateLite
// ============================================================
// WHY THIS FILE EXISTS:
//   Encapsulates all HTTP interactions with the backend API.
//   Automatically attaches the JWT token from localStorage
//   to requests targeting protected endpoints.
// ============================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get HTTP headers including Authorization Bearer token if available
 */
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = localStorage.getItem('echomatelite_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

/**
 * Generic request wrapper to handle JSON responses and HTTP errors
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

// Export API service functions
export const api = {
  // ---- Authentication APIs ----
  async register(userData) {
    return request('/auth/register', {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData),
    });
  },

  async login(credentials) {
    return request('/auth/login', {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials),
    });
  },

  // ---- User Profile APIs ----
  async getProfile() {
    return request('/users/profile', {
      method: 'GET',
      headers: getHeaders(true),
    });
  },

  async updateProfile(profileData) {
    return request('/users/profile', {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(profileData),
    });
  },

  // ---- Post & News Feed APIs ----
  async getPosts() {
    return request('/posts', {
      method: 'GET',
      headers: getHeaders(true),
    });
  },

  async createPost(postData) {
    return request('/posts', {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(postData),
    });
  },
};

export default api;
