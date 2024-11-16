import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SuperadminDashboard from '../pages/superadmin/Dashboard';
import BusinessList from '../pages/superadmin/Businesses';
import PackageList from '../pages/superadmin/Packages';
import SuperadminSettings from '../pages/superadmin/Settings';
import MainLayout from '../layouts/MainLayout';

const SuperadminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SuperadminDashboard />} />
        <Route path="businesses" element={<BusinessList />} />
        <Route path="packages" element={<PackageList />} />
        <Route path="settings" element={<SuperadminSettings />} />
      </Route>
    </Routes>
  );
};

export default SuperadminRoutes;