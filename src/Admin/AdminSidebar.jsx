// src/admin/AdminSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Dashboard
                </Link>
                <Link
                    to="/admin/products"
                    className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Manage Products
                </Link>
                <Link
                    to="/admin/products/add"
                    className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Add Product
                </Link>
                <Link
                    to="/admin/users"
                    className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Manage Users
                </Link>
            </nav>

            <div className="p-6 border-t border-gray-700">
                <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;