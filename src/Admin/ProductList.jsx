// src/Admin/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Ambil data produk dari JSON Server
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await fetch('http://localhost:3000/products');
        if (!res.ok) throw new Error('Gagal mengambil data produk');

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data produk. Pastikan JSON Server berjalan.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    if (price == null) return '-';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const shortId = (id) => {
    if (!id) return '-';
    return id.length > 10 ? `${id.slice(0, 10)}...` : id;
  };

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Anda yakin ingin menghapus produk "${title}"?`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus produk. Coba lagi nanti.');
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER: Daftar Produk + tombol tambah (turun sedikit dari atas) */}
      <div className="sticky top-0 z-10 bg-gray-50 pt-1 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Daftar Produk</h1>
            <p className="text-gray-600">Kelola semua produk di toko Anda</p>
          </div>
          <Link
            to="/admin/products/add"
            className="inline-flex items-center px-5 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2 text-lg">➕</span>
            Tambah Produk Baru
          </Link>
        </div>
      </div>

      {/* KONTEN: tabel / list produk */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading && <p className="text-gray-500">Memuat data produk...</p>}

        {error && !loading && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-gray-500">Belum ada produk.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500 uppercase text-xs tracking-wide">
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 pr-4">Nama Produk</th>
                  <th className="py-3 pr-4">Harga</th>
                  <th className="py-3 pr-4">Kategori</th>
                  <th className="py-3 pr-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr
                    key={prod.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="py-3 pr-4 text-gray-500">
                      {shortId(prod.id)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-gray-800 font-medium">
                        {prod.title}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-800">
                      {formatPrice(prod.price)}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-medium">
                        {prod.category || '-'}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/admin/products/edit/${prod.id}`}
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <span>✏️</span>
                          <span>Edit</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(prod.id, prod.title)}
                          className="text-sm text-red-600 hover:underline flex items-center gap-1"
                        >
                          <span>🗑️</span>
                          <span>Hapus</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
