import axios from 'axios';
import { useAuth } from './auth';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const auth = useAuth.getState();
    const token = auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const auth = useAuth.getState();

    if (error.response?.status === 401 && !originalRequest._retry && auth.refreshToken) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken: auth.refreshToken,
        });

        const { accessToken, refreshToken } = response.data;
        auth.setTokens(accessToken, refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        auth.clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);