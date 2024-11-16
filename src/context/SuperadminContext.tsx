import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { superadminApi } from '../lib/api/superadmin';

interface SuperadminContextType {
  stats: {
    totalBusinesses: number;
    activeSubscriptions: number;
    monthlyRevenue: number;
    yearlyRevenue: number;
  };
  isLoading: boolean;
  error: Error | null;
}

const SuperadminContext = createContext<SuperadminContextType | undefined>(undefined);

export const useSuperadmin = () => {
  const context = useContext(SuperadminContext);
  if (!context) {
    throw new Error('useSuperadmin must be used within a SuperadminProvider');
  }
  return context;
};

export const SuperadminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['superadmin', 'stats'],
    queryFn: () => superadminApi.getDashboardStats(),
  });

  const value = {
    stats: data || {
      totalBusinesses: 0,
      activeSubscriptions: 0,
      monthlyRevenue: 0,
      yearlyRevenue: 0,
    },
    isLoading,
    error: error as Error | null,
  };

  return (
    <SuperadminContext.Provider value={value}>
      {children}
    </SuperadminContext.Provider>
  );
};