import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLog = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Fetch data ke json-server (Asumsi port 3000)
      // Kita mencari admin yang emailnya sesuai input user
      const response = await fetch(`http://localhost:3000/admins?email=${email}`);
      
      if (!response.ok) {
        throw new Error('Gagal terhubung ke server');
      }

      const data = await response.json();

      // 2. Validasi apakah email ditemukan
      if (data.length === 0) {
        setError('Email tidak terdaftar sebagai admin.');
        setIsLoading(false);
        return;
      }

      const adminData = data[0];

      // 3. Validasi Password
      if (adminData.password === password) {
        console.log("Login Berhasil:", adminData);

        // 4. Simpan sesi login ke LocalStorage
        // Ini penting agar nanti di Dashboard bisa menampilkan nama admin
        localStorage.setItem('admin_token', JSON.stringify(adminData));

        // 5. Redirect ke halaman Admin Dashboard
        // Pastikan route '/admin/dashboard' sudah diatur di App.js / index.js
        navigate('/admin/dashboard'); 
      } else {
        setError('Password salah, silakan coba lagi.');
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError('Terjadi kesalahan koneksi server. Pastikan json-server berjalan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">Admin Portal</h2>
          <p className="text-gray-500 text-sm mt-2">Masuk untuk mengelola E-Commerce</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-bold py-2 px-4 rounded transition duration-300 
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            {isLoading ? 'Memproses...' : 'Masuk Dashboard'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
                Bukan Admin? <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/login')}>Login User Disini</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLog;