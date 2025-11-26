// src/admin/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const navigate = useNavigate();

    // Ambil data produk saat komponen pertama kali dimuat
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Gagal memuat daftar produk.');
        }
    };

    const handleDelete = async (id) => {
        if (deleteConfirm === id) {
            try {
                const response = await fetch(`http://localhost:3001/products/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setProducts(products.filter(product => product.id !== id));
                    setDeleteConfirm(null);
                    alert('Produk berhasil dihapus!');
                } else {
                    alert('Gagal menghapus produk.');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Terjadi kesalahan saat menghapus produk.');
            }
        } else {
            setDeleteConfirm(id);
            // Auto cancel confirmation after 3 seconds
            setTimeout(() => setDeleteConfirm(null), 3000);
        }
    };

    const formatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Daftar Produk</h1>

            {/* Tombol Tambah Produk */}
            <div className="mb-6">
                <button
                    onClick={() => navigate('/admin/products/add')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Tambah Produk Baru
                </button>
            </div>

            {/* Tabel Daftar Produk */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">ID</th>
                            <th className="py-2 px-4 border">Nama Produk</th>
                            <th className="py-2 px-4 border">Harga</th>
                            <th className="py-2 px-4 border">Kategori</th>
                            <th className="py-2 px-4 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="py-2 px-4 border">{product.id}</td>
                                <td className="py-2 px-4 border">{product.name}</td>
                                <td className="py-2 px-4 border">{formatRupiah(product.price)}</td>
                                <td className="py-2 px-4 border">{product.category}</td>
                                <td className="py-2 px-4 border space-x-2">
                                    <button
                                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className={`${
                                            deleteConfirm === product.id
                                                ? 'text-red-800'
                                                : 'text-red-600 hover:text-red-800'
                                        }`}
                                    >
                                        {deleteConfirm === product.id ? 'Konfirmasi?' : 'Hapus'}
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

export default ProductList;