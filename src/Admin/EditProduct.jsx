// src/admin/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                alert('Gagal memuat data produk.');
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Produk berhasil diperbarui!');
                navigate('/admin/products');
            } else {
                alert('Gagal memperbarui produk.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat memperbarui produk.');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Produk</h1>
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
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Perbarui Produk
                </button>
            </form>
        </div>
    );
};

export default EditProduct;