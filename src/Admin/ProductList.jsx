// src/admin/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Ambil data produk saat komponen pertama kali dimuat
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch('http://localhost:3000/products');
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Gagal memuat daftar produk. Pastikan server JSON berjalan di http://localhost:3000');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (deleteConfirm === id) {
            setDeleting(id);
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setProducts(products.filter(product => product.id !== id));
                    setDeleteConfirm(null);
                    alert('Produk berhasil dihapus!');
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    alert(errorData.message || 'Gagal menghapus produk.');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Terjadi kesalahan saat menghapus produk. Pastikan server JSON berjalan.');
            } finally {
                setDeleting(null);
            }
        } else {
            setDeleteConfirm(id);
            // Auto cancel confirmation after 5 seconds
            setTimeout(() => setDeleteConfirm(null), 5000);
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Daftar Produk</h1>
                    <p className="text-gray-600">Kelola semua produk di toko Anda</p>
                </div>
                <button
                    onClick={() => navigate('/admin/products/add')}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md flex items-center gap-2"
                >
                    <span>➕</span>
                    <span>Tambah Produk Baru</span>
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                        <p className="mt-4 text-gray-600">Memuat data produk...</p>
                    </div>
                </div>
            ) : error && products.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <span className="text-6xl mb-4 block">⚠️</span>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Memuat Data</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={fetchProducts}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Coba Lagi
                    </button>
                </div>
            ) : products.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <span className="text-6xl mb-4 block">📦</span>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum ada produk</h3>
                    <p className="text-gray-600 mb-6">Mulai dengan menambahkan produk pertama Anda</p>
                    <button
                        onClick={() => navigate('/admin/products/add')}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Tambah Produk Pertama
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Produk</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{product.id.substring(0, 12)}...</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatRupiah(product.price)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                                    className="text-blue-600 hover:text-blue-900 font-medium transition-colors"
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={deleting === product.id}
                                                    className={`font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                                        deleteConfirm === product.id
                                                            ? 'text-red-800 hover:text-red-900 bg-red-50 px-3 py-1 rounded'
                                                            : 'text-red-600 hover:text-red-800'
                                                    }`}
                                                >
                                                    {deleting === product.id ? (
                                                        <span className="flex items-center gap-2">
                                                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                                                            <span>Menghapus...</span>
                                                        </span>
                                                    ) : deleteConfirm === product.id ? (
                                                        '✓ Klik Lagi untuk Hapus'
                                                    ) : (
                                                        '🗑️ Hapus'
                                                    )}
                                                </button>
                                            </div>
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

export default ProductList;