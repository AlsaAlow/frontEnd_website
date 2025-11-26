// src/admin/AdminLayout.jsx
import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;