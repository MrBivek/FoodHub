// utils/API.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      
      // Don't logout if already on login/register page
      if (!currentPath.includes("/login") && !currentPath.includes("/register")) {
        console.log("🔒 Session expired. Redirecting to login...");
        
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Store the current location to redirect back after login
        const redirectPath = currentPath !== "/" ? currentPath : undefined;
        
        // Only redirect if not already on auth pages
        setTimeout(() => {
          if (redirectPath) {
            window.location.href = `/login?redirect=${encodeURIComponent(redirectPath)}`;
          } else {
            window.location.href = "/login";
          }
        }, 100);
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("❌ Access forbidden:", error.response.data.message);
      // Don't auto-logout on 403, just show error
    }

    // Handle network errors
    if (!error.response) {
      console.error("🌐 Network error:", error.message);
      error.message = "Network error. Please check your connection.";
    }

    return Promise.reject(error);
  }
);

export default API;