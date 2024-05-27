import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart';
import { Menu } from './pages/Menu/Menu';
import { Error } from './pages/Error/Error';
import { Layout } from './Layout/Menu/Layout.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Menu /> },
            { path: '/cart', element: <Cart /> },
        ],
    },
    { path: '*', element: <Error /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
