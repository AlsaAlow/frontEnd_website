// src/admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* {side bar kiri} */}
      <AdminSidebar />
      
      {/* Content section scrollable */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;