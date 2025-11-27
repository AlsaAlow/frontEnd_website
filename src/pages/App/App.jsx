import React from 'react';
import { useRoutes, BrowserRouter, useLocation } from 'react-router-dom';
import { ShoppingCartProvider } from '../../context';
import { NavBar, Footer, CheckoutSideMenu } from '../../components';
import './App.css';

// === PAGES ===
import { HomePage, NotFound, MyOrders, DetailProduct, CartShoppingPage, OrderPage, LastOrderPage } from '../../pages';

// === ADMIN PAGES ===
import AdminLayout from '../../Admin/AdminLayout';
import AdminDashboard from '../../Admin/AdminDashboard';
import AddProduct from '../../Admin/AddProduct';
import EditProduct from '../../Admin/EditProduct';
import ManageUsers from '../../Admin/ManageUsers';
import ProductList from '../../Admin/ProductList';

// === LOGIN PAGES ===
import AdminLog from '../../Login/AdminLog';
import UsersLog from '../../Login/UsersLog';

// 1. Definisikan Route
const AppRoutes = () => {
    let routes = useRoutes([
        // === TAMPILAN AWAL (LOGIN) ===
        // Saat buka website ('/'), langsung tampilkan Login User
        { path: '/', element: <UsersLog /> },
        
        // === PUBLIC PAGES ===
        // HomePage pindah ke '/home'
        { path: '/home', element: <HomePage /> },
        
        // Route kategori tetap mengarah ke HomePage (sesuai logika tokomu sebelumnya)
        { path: '/laptops', element: <HomePage /> },
        { path: '/tablets', element: <HomePage /> },
        { path: '/cameras', element: <HomePage /> },
        { path: '/headphones', element: <HomePage /> },
        { path: '/cellphones', element: <HomePage /> },
        { path: '/accessories', element: <HomePage /> },
        
        // Fitur User
        { path: '/cart-shopping', element: <CartShoppingPage /> },
        { path: '/my-orders/last', element: <LastOrderPage /> },
        { path: '/my-orders/:id', element: <OrderPage /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/product/:id', element: <DetailProduct /> },

        // === LOGIN ROUTES ===
        { path: '/login', element: <UsersLog /> },         
        { path: '/admin/login', element: <AdminLog /> },   

        // === ADMIN ROUTES (Protected) ===
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                { index: true, element: <AdminDashboard /> },
                { path: 'dashboard', element: <AdminDashboard /> },
                { path: 'products', element: <ProductList /> },
                { path: 'products/add', element: <AddProduct /> },
                { path: 'products/edit/:id', element: <EditProduct /> },
                { path: 'users', element: <ManageUsers /> },
            ],
        },

        // Fallback: 404 Not Found
        { path: '/*', element: <NotFound /> },
    ]);

    return routes;
};

// 2. Komponen Pembungkus untuk Logika Tampilan NavBar
const AppContent = () => {
    const location = useLocation();

    // Daftar path di mana NavBar & Footer HARUS DISEMBUNYIKAN
    const hideNavPaths = ['/', '/login', '/admin/login'];
    
    // Cek apakah path saat ini ada di daftar hidden, atau path admin
    const isHidden = hideNavPaths.includes(location.pathname) || location.pathname.startsWith('/admin');

    return (
        <>
            {/* Tampilkan NavBar hanya jika TIDAK hidden */}
            {!isHidden && <NavBar />}
            
            <AppRoutes />
            
            {/* Tampilkan Footer & SideMenu hanya jika TIDAK hidden */}
            {!isHidden && <Footer />}
            {!isHidden && <CheckoutSideMenu />}
        </>
    );
};

// 3. App Utama
export const App = () => {
    return (
        <ShoppingCartProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </ShoppingCartProvider>
    );
};

export default App;