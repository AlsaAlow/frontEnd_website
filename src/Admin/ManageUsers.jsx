// src/admin/ManageUsers.jsx
import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Ambil data pengguna dari JSON Server
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsers(Array.isArray(data) ? data : []))
            .catch(err => {
                console.error('Error fetching users:', err);
                setUsers([]);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setUsers(users.filter(user => user.id !== id));
                    alert('Pengguna berhasil dihapus!');
                } else {
                    alert('Gagal menghapus pengguna.');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Terjadi kesalahan saat menghapus pengguna.');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelola Pengguna</h1>
                <p className="text-gray-600">Kelola semua pengguna di sistem</p>
            </div>

            {users.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <span className="text-6xl mb-4 block">👥</span>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum ada pengguna</h3>
                    <p className="text-gray-600">Tidak ada pengguna terdaftar saat ini</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{user.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red-600 hover:text-red-900 font-medium transition-colors"
                                            >
                                                🗑️ Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;