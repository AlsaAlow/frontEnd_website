import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersLog = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Fetch ke json-server
      const response = await fetch(`http://localhost:3000/users?email=${email}`);
      
      if (!response.ok) {
        throw new Error('Gagal terhubung ke server');
      }

      const data = await response.json();

      // Validasi User
      if (data.length === 0) {
        setError('Email tidak terdaftar.');
        setIsLoading(false);
        return;
      }

      const userData = data[0];

      // Validasi Password
      if (userData.password === password) {
        console.log("Login User Berhasil:", userData);
        localStorage.setItem('user_token', JSON.stringify(userData));

        // === PERUBAHAN DISINI ===
        // Arahkan ke '/home' karena '/' sekarang adalah halaman login
        navigate('/home'); 
        // ========================

      } else {
        setError('Password salah.');
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError('Terjadi kesalahan koneksi server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Selamat Datang</h2>
          <p className="text-gray-500 text-sm mt-2">Masuk untuk mulai berbelanja</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded border border-red-200 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition duration-300 
              ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? 'Memuat...' : 'Masuk Sekarang'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
                Belum punya akun? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Daftar disini</span>
            </p>
            <div className="border-t border-gray-100 pt-2">
              <p className="text-xs text-gray-400">
                  Masuk sebagai <span className="text-slate-600 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/admin/login')}>Administrator</span>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UsersLog;