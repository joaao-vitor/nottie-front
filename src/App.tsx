import './App.css';
import { Toaster } from './components/ui/toaster';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/confirm-email',
        element: <ConfirmEmailPage />,
    },
]);
function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    );
}

export default App;
