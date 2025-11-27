// src/admin/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        images: [],
        banner: '',
        brand: '',
        rate: 3,
        quantity: 0
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await fetch(`http://localhost:3000/products/${id}`);
                
                if (response.status === 404) {
                    setNotFound(true);
                    setError('Produk tidak ditemukan.');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }

                const data = await response.json();
                // Ensure images is an array and has at least 3 slots
                const imagesArray = Array.isArray(data.images) ? data.images : [];
                while (imagesArray.length < 3) {
                    imagesArray.push('');
                }
                setFormData({
                    ...data,
                    images: imagesArray.slice(0, 3)
                });
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Gagal memuat data produk. Pastikan server JSON berjalan.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const validateURL = (url) => {
        if (!url) return true; // Empty URL is allowed for images
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Validasi URL
        if (formData.banner && !validateURL(formData.banner)) {
            setError('URL Banner tidak valid. Pastikan menggunakan format URL yang benar (contoh: https://example.com/image.jpg)');
            return;
        }

        const imageUrls = formData.images.filter((img) => img.trim() !== '');
        for (const img of imageUrls) {
            if (!validateURL(img)) {
                setError(`URL Gambar tidak valid: ${img}. Pastikan menggunakan format URL yang benar.`);
                return;
            }
        }

        setSubmitting(true);
        try {
            // Filter out empty images
            const filteredImages = formData.images.filter(img => img.trim() !== '');
            
            const productData = {
                ...formData,
                images: filteredImages,
                price: Number(formData.price),
                rate: Number(formData.rate),
                quantity: Number(formData.quantity)
            };

            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                alert('Produk berhasil diperbarui!');
                navigate('/admin/products');
            } else {
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.message || 'Gagal memperbarui produk. Silakan coba lagi.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Terjadi kesalahan saat memperbarui produk. Pastikan server JSON berjalan.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                    <p className="mt-4 text-gray-600">Memuat data produk...</p>
                </div>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <span className="text-4xl mb-4 block">❌</span>
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Produk Tidak Ditemukan</h2>
                    <p className="text-red-600 mb-4">Produk dengan ID tersebut tidak ditemukan.</p>
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Kembali ke Daftar Produk
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Produk</h1>
                <p className="text-gray-600">Ubah informasi produk di bawah ini</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nama Produk (Title) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Masukkan nama produk"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Harga <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategori <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Tablets">Tablets</option>
                                <option value="Cameras">Cameras</option>
                                <option value="Headphones">Headphones</option>
                                <option value="Cellphones">Cellphones</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Brand <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="Masukkan brand"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rate (1-5) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="0"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Deskripsi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            rows="5"
                            placeholder="Masukkan deskripsi produk"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL Banner <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="banner"
                            value={formData.banner}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL Gambar <span className="text-gray-500 text-xs">(dapat menambahkan hingga 3 gambar)</span>
                        </label>
                        {formData.images.map((image, index) => (
                            <input
                                key={index}
                                type="text"
                                value={image}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-3"
                                placeholder={`Gambar ${index + 1} (URL) - Opsional`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Memperbarui...</span>
                                </>
                            ) : (
                                <>
                                    <span>✓</span>
                                    <span>Perbarui Produk</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;