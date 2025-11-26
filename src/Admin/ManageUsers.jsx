// src/admin/ManageUsers.jsx
import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Contoh: Ambil data pengguna dari JSON Server
        // Anda bisa ganti URL jika menggunakan endpoint lain
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            try {
                const response = await fetch(`http://localhost:3001/users/${id}`, {
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
        <div>
            <h1 className="text-2xl font-bold mb-6">Kelola Pengguna</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Nama</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border">{user.id}</td>
                                <td className="py-2 px-4 border">{user.name}</td>
                                <td className="py-2 px-4 border">{user.email}</td>
                                <td className="py-2 px-4 border">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;