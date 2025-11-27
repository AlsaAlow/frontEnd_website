// src/Admin/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    images: ["", "", ""],
    banner: "",
    brand: "",
    rate: 3,
    quantity: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
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
    setError("");
    
    // Validasi URL
    if (formData.banner && !validateURL(formData.banner)) {
      setError("URL Banner tidak valid. Pastikan menggunakan format URL yang benar (contoh: https://example.com/image.jpg)");
      return;
    }

    const imageUrls = formData.images.filter((img) => img.trim() !== "");
    for (const img of imageUrls) {
      if (!validateURL(img)) {
        setError(`URL Gambar tidak valid: ${img}. Pastikan menggunakan format URL yang benar.`);
        return;
      }
    }

    // Validasi minimal 1 gambar jika banner ada
    if (formData.banner && imageUrls.length === 0) {
      setError("Minimal harus ada 1 gambar jika banner diisi.");
      return;
    }

    setLoading(true);
    try {
      // Filter out empty images
      const filteredImages = formData.images.filter((img) => img.trim() !== "");

      const productData = {
        ...formData,
        id: generateId(),
        images: filteredImages,
        price: Number(formData.price),
        rate: Number(formData.rate),
        quantity: Number(formData.quantity),
      };

      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Produk berhasil ditambahkan!");
        navigate("/admin/products");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "Gagal menambahkan produk. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Terjadi kesalahan saat menambahkan produk. Pastikan server JSON berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tambah Produk Baru
        </h1>
        <p className="text-gray-600">
          Isi form di bawah untuk menambahkan produk baru
        </p>
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
              URL Gambar{" "}
              <span className="text-gray-500 text-xs">
                (dapat menambahkan hingga 3 gambar)
              </span>
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
              onClick={() => navigate("/admin/products")}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>Simpan Produk</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;