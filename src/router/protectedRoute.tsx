import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/use-auth';
import HeaderContent from '@/features/header/header.component';

const ProtectedRoute = () => {
    const { token } = useAuth();
    return token?.accessToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
