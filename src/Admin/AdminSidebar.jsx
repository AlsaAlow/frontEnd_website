// src/admin/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/admin/dashboard') {
            return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
        }
        return location.pathname.startsWith(path);
    };

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/admin/products', label: 'Manage Products', icon: '📦' },
        { path: '/admin/products/add', label: 'Add Product', icon: '➕' },
        { path: '/admin/users', label: 'Manage Users', icon: '👥' },
    ];

    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col shadow-lg">
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-sm text-gray-400 mt-1">E-Commerce Management</p>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                            isActive(item.path)
                                ? 'bg-gray-700 text-white shadow-md'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-700">
                <button className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium shadow-md">
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;