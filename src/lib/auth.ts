import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from './axios';

interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  tenantId: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setTokens: (access: string, refresh: string, user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setTokens: (access: string, refresh: string, user: User) => {
        set({
          accessToken: access,
          refreshToken: refresh,
          user,
          isAuthenticated: true
        });

        // Set the authorization header for future requests
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      },

      logout: () => {
        // Clear auth state
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false
        });
        
        // Clear persisted storage
        localStorage.removeItem('auth-storage');
        sessionStorage.clear();

        // Reset axios default headers
        delete axiosInstance.defaults.headers.common['Authorization'];

        // Redirect to login page
        window.location.href = '/login';
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);