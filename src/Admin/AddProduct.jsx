// src/admin/AddProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Produk berhasil ditambahkan!');
                navigate('/admin/products');
            } else {
                alert('Gagal menambahkan produk.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menambahkan produk.');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Tambah Produk Baru</h1>
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="block mb-1">Nama Produk</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Harga</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Kategori</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Pilih Kategori</option>
                        <option value="laptops">Laptops</option>
                        <option value="tablets">Tablets</option>
                        <option value="cameras">Cameras</option>
                        <option value="headphones">Headphones</option>
                        <option value="cellphones">Cellphones</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Deskripsi</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1">URL Gambar</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Simpan Produk
                </button>
            </form>
        </div>
    );
};

export default AddProduct;