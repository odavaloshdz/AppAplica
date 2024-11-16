import { axiosInstance } from '../axios';

export interface Business {
  id: string;
  name: string;
  owner: string;
  email: string;
  subscription: string;
  status: 'active' | 'suspended' | 'expired';
  users: number;
  lastLogin: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: {
    users: number | 'Unlimited';
    storage: string;
    products: number | 'Unlimited';
    locations: number | 'Unlimited';
  };
  active: boolean;
}

export const superadminApi = {
  // Businesses
  getBusinesses: async () => {
    const { data } = await axiosInstance.get('/superadmin/businesses');
    return data;
  },

  getBusiness: async (id: string) => {
    const { data } = await axiosInstance.get(`/superadmin/businesses/${id}`);
    return data;
  },

  createBusiness: async (business: Partial<Business>) => {
    const { data } = await axiosInstance.post('/superadmin/businesses', business);
    return data;
  },

  updateBusiness: async (id: string, business: Partial<Business>) => {
    const { data } = await axiosInstance.put(`/superadmin/businesses/${id}`, business);
    return data;
  },

  deleteBusiness: async (id: string) => {
    const { data } = await axiosInstance.delete(`/superadmin/businesses/${id}`);
    return data;
  },

  // Packages
  getPackages: async () => {
    const { data } = await axiosInstance.get('/superadmin/packages');
    return data;
  },

  getPackage: async (id: string) => {
    const { data } = await axiosInstance.get(`/superadmin/packages/${id}`);
    return data;
  },

  createPackage: async (pkg: Partial<Package>) => {
    const { data } = await axiosInstance.post('/superadmin/packages', pkg);
    return data;
  },

  updatePackage: async (id: string, pkg: Partial<Package>) => {
    const { data } = await axiosInstance.put(`/superadmin/packages/${id}`, pkg);
    return data;
  },

  deletePackage: async (id: string) => {
    const { data } = await axiosInstance.delete(`/superadmin/packages/${id}`);
    return data;
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    const { data } = await axiosInstance.get('/superadmin/dashboard/stats');
    return data;
  },

  // Settings
  getSettings: async () => {
    const { data } = await axiosInstance.get('/superadmin/settings');
    return data;
  },

  updateSettings: async (settings: any) => {
    const { data } = await axiosInstance.put('/superadmin/settings', settings);
    return data;
  }
};