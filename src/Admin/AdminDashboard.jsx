// src/admin/AdminDashboard.jsx
import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <p>Selamat datang di panel admin. Anda dapat mengelola produk dan pengguna dari sini.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-3xl font-bold">24</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-3xl font-bold">158</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-3xl font-bold">89</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;