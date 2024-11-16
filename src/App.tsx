import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/auth/LoginForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import ProductList from './pages/products/ProductList';
import ProductForm from './pages/products/ProductForm';
import SettingsPage from './pages/settings/SettingsPage';
import SuperadminRoutes from './routes/superadmin';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import MultiStepRegister from './components/auth/MultiStepRegister';
import { useAuth } from './lib/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />
              } />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/login" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />
              } />
              <Route path="/register" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <MultiStepRegister />
              } />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory">
                  <Route path="products" element={<ProductList />} />
                  <Route path="products/new" element={<ProductForm />} />
                  <Route path="products/:id/edit" element={<ProductForm />} />
                </Route>
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Superadmin Routes */}
              <Route path="/superadmin/*" element={
                <ProtectedRoute requiredRoles={['superadmin']}>
                  <SuperadminRoutes />
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer position="bottom-right" />
          </BrowserRouter>
        </ProductProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;