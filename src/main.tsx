import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart';
// import { Menu } from './pages/Menu/Menu';
import { Error as ErrorPage } from './pages/Error/Error';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import axios from 'axios';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Success } from './pages/Success/Success.tsx';

// eslint-disable-next-line react-refresh/only-export-components
const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            // с помощью этой записи невозможно будет пройти на другую страницу пока пользователь не будет залогинен
            <RequireAuth>
                <Layout />
            </RequireAuth>
        ),
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<>Загрузка...</>}>
                        <Menu />
                    </Suspense>
                ),
            },
            {
                path: '/success',
                element: <Success />,
            },
            { path: '/cart', element: <Cart /> },
            {
                path: '/product/:id',
                element: <Product />,
                errorElement: <>Ошибка</>,
                loader: async ({ params }) => {
                    return defer({
                        data: new Promise((resolve, reject) => {
                            setTimeout(() => {
                                axios
                                    .get(`${PREFIX}/products/${params.id}`)
                                    .then((data) => resolve(data))
                                    .catch((e) => reject(e));
                            }, 2000);
                        }),
                    });
                    // вариант без использования defer
                    // async ({ params }) => {
                    // await new Promise<void>((resolve) => {
                    //     setTimeout(() => {
                    //         resolve();
                    //     }, 2000);
                    // });
                    // const { data } = await axios.get(
                    //     `${PREFIX}/products/${params.id}`
                    // );
                    // return data;
                },
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    },
    { path: '*', element: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
