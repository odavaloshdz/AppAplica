import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ModulesPanel from '../components/ModulesPanel';
import FloatingControls from '../components/FloatingControls';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [modulesPanelOpen, setModulesPanelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        modulesPanelOpen={modulesPanelOpen}
        setModulesPanelOpen={setModulesPanelOpen}
      />
      
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <main className={`
        pt-16 transition-all duration-300
        ${collapsed ? 'pl-20' : 'pl-64'}
      `}>
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>

      <ModulesPanel
        isOpen={modulesPanelOpen}
        setModulesPanelOpen={setModulesPanelOpen}
      />

      <FloatingControls />
    </div>
  );
};

export default MainLayout;