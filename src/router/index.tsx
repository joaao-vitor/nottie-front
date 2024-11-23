import ConfirmEmailPage from '@/pages/ConfirmEmailPage';
import HomePage from '@/pages/HomePage';
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './protectedRoute';
import HomeLoggedInPage from '@/pages/HomeLoggedInPage';
import Layout from '@/features/layout/layout.component';

export default createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
                {
                    path: '/confirm-email',
                    children: [{ path: '*', element: <ConfirmEmailPage /> }],
                },
                {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: '/dashboard',
                            element: <HomeLoggedInPage />,
                        },
                    ],
                },
            ],
        },
    ],
    {
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_partialHydration: true,
            v7_normalizeFormMethod: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);
