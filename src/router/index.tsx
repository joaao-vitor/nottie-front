import ConfirmEmailPage from '@/pages/ConfirmEmailPage';
import HomePage from '@/pages/HomePage';
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './protectedRoute';
import Layout from '@/features/layout/layout';
import DashboardLayout from '@/features/layout/dashboard-layout';
import HomeDashboardPage from '@/pages/dashboard/HomePage';
import NotesGroupPage from '@/pages/dashboard/NotesGroupPage';

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
            ],
        },
        {
            path: '/dashboard',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '',
                    element: <DashboardLayout />,
                    children: [
                        {
                            path: '',
                            element: <HomeDashboardPage />,
                        },

                        {
                            path: 'notesgroup/:id',
                            element: <NotesGroupPage />,
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
