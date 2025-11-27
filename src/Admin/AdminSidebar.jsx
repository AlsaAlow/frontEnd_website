import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Squares2X2Icon, 
  ArchiveBoxIcon, 
  PlusCircleIcon, 
  UsersIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/solid'; 
// Pastikan kamu sudah install heroicons: npm install @heroicons/react
// Jika belum/error, hapus bagian import icon dan ganti dengan emoji atau text biasa.

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Fungsi Logout
    const handleLogout = () => {
        // Hapus sesi admin
        localStorage.removeItem('admin_token');
        // Arahkan ke halaman login
        navigate('/admin/login');
    };

    const isActive = (path) => {
        // Logika agar menu tetap aktif saat berada di sub-halaman
        if (path === '/admin/products') {
            return location.pathname.startsWith('/admin/products') && location.pathname !== '/admin/products/add';
        }
        return location.pathname === path;
    };

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: <Squares2X2Icon className="w-5 h-5"/> },
        { path: '/admin/products', label: 'Manage Products', icon: <ArchiveBoxIcon className="w-5 h-5"/> },
        { path: '/admin/products/add', label: 'Add Product', icon: <PlusCircleIcon className="w-5 h-5"/> },
        { path: '/admin/users', label: 'Manage Users', icon: <UsersIcon className="w-5 h-5"/> },
    ];

    return (
        // CLASS PENTING: h-screen sticky top-0 (Agar sidebar full tinggi layar & diam saat discroll)
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 shadow-xl z-50">
            
            {/* 1. Header Sidebar */}
            <div className="p-6 border-b border-slate-800 flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold tracking-wider">Admin Panel</h1>
                <p className="text-xs text-slate-400 mt-1">E-Commerce Manager</p>
            </div>

            {/* 2. Menu Navigasi (Gunakan flex-1 agar mendorong Logout ke bawah) */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                            isActive(item.path)
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        {/* Jika icon error, bisa dihapus bagian ini */}
                        <span>{item.icon}</span> 
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* 3. Tombol Logout (Footer) */}
            <div className="p-4 border-t border-slate-800 bg-slate-900">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-all duration-300 font-semibold border border-red-600/20 hover:border-red-600"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;