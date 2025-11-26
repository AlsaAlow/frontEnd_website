// src/App.jsx
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider } from '../../context';
import { HomePage, NotFound, MyOrders, DetailProduct, CartShoppingPage, OrderPage, LastOrderPage } from '../../pages';
import { NavBar, Footer, CheckoutSideMenu } from '../../components';
import './App.css';

import AdminLayout from '../../Admin/AdminLayout';
import AdminDashboard from '../../Admin/AdminDashboard';
import AddProduct from '../../Admin/AddProduct';
import EditProduct from '../../Admin/EditProduct';
import ManageUsers from '../../Admin/ManageUsers';
import ProductList from '../../Admin/ProductList';

const AppRoutes = () => {
    let routes = useRoutes([
        // === Public Routes ===
        { path: '/', element: <HomePage /> },
        { path: '/laptops', element: <HomePage /> },
        { path: '/tablets', element: <HomePage /> },
        { path: '/cameras', element: <HomePage /> },
        { path: '/headphones', element: <HomePage /> },
        { path: '/cellphones', element: <HomePage /> },
        { path: '/accessories', element: <HomePage /> },
        { path: '/cart-shopping', element: <CartShoppingPage /> },
        { path: '/my-orders/last', element: <LastOrderPage /> },
        { path: '/my-orders/:id', element: <OrderPage /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/product/:id', element: <DetailProduct /> },

        // === Admin Routes (Protected - dengan layout admin) ===
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                { index: true, element: <AdminDashboard /> }, // /admin → redirect ke dashboard
                { path: 'dashboard', element: <AdminDashboard /> },
                { path: 'products', element: <ProductList /> },
                { path: 'products/add', element: <AddProduct /> },
                { path: 'products/edit/:id', element: <EditProduct /> },
                { path: 'users', element: <ManageUsers /> },
            ],
        },

        // Fallback: 404
        { path: '/*', element: <NotFound /> },
    ]);

    return routes;
};

export const App = () => {
    return (
        <ShoppingCartProvider>
            <BrowserRouter>
                <AppRoutes />
                <NavBar />
                <Footer />
                <CheckoutSideMenu />
            </BrowserRouter>
        </ShoppingCartProvider>
    );
};