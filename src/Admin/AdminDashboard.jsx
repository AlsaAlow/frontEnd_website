// src/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch products
                const productsResponse = await fetch('http://localhost:3000/products');
                const products = await productsResponse.json();
                
                // Fetch users
                const usersResponse = await fetch('http://localhost:3000/users');
                const users = await usersResponse.json();
                
                // Fetch orders (if exists)
                let orders = [];
                try {
                    const ordersResponse = await fetch('http://localhost:3000/orders');
                    orders = await ordersResponse.json();
                } catch (error) {
                    // Orders might not exist yet
                    console.log('Orders endpoint not available');
                }

                setStats({
                    totalProducts: Array.isArray(products) ? products.length : 0,
                    totalUsers: Array.isArray(users) ? users.length : 0,
                    totalOrders: Array.isArray(orders) ? orders.length : 0
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Selamat datang di panel admin. Anda dapat mengelola produk dan pengguna dari sini.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                        <p className="mt-4 text-gray-600">Memuat data...</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Products</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Users</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Orders</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <span className="text-2xl">🛒</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;