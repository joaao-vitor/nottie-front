import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from 'react';
import { AxiosError } from 'axios';
import api from '@/services/api';
import { SuccessResponse } from '@/@types/SuccessResponse';
import { Workstation, WorkstationMenuItem } from '@/@types/Workstation';

interface Token {
    email: string;
    isAuthenticated: boolean;
    created: Date;
    expires: Date;
    accessToken: string;
    refreshToken: string;
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profileImg: string;
    workstations: Workstation[];
}

export interface AuthContextType {
    user: User | null;
    token: Token | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    refresh: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

const parseToken = (data: any): Token => ({
    ...data,
    created: new Date(data.created),
    expires: new Date(data.expires),
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<Token | null>(() => {
        const storedToken = localStorage.getItem('token');
        const parsedToken = storedToken
            ? parseToken(JSON.parse(storedToken))
            : null;
        return parsedToken && parsedToken.expires > new Date()
            ? parsedToken
            : null;
    });
    const [loading, setLoading] = useState(false);

    const loadUserData = useCallback(async () => {
        if (!token?.accessToken) return;

        setLoading(true);
        try {
            const response = await api.get<SuccessResponse<User>>(`/user/me`);
            setUser(response.data.data);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                await handleTokenRefresh();
            } else {
                console.error('Error loading user data', error);
                logout();
            }
        } finally {
            setLoading(false);
        }
    }, [token]);

    const handleTokenRefresh = useCallback(async () => {
        if (!token?.refreshToken) return logout();

        setLoading(true);
        try {
            const { data } = await api.post<SuccessResponse<Token>>(
                `/auth/refresh-token`,
                {
                    refreshToken: token.refreshToken,
                }
            );
            const newToken = parseToken(data.data);
            setToken(newToken);
            localStorage.setItem('token', JSON.stringify(newToken));
            await loadUserData();
        } catch (error) {
            console.error('Error refreshing token', error);
            logout();
        } finally {
            setLoading(false);
        }
    }, [token, loadUserData]);

    useEffect(() => {
        if (token && token.expires.getTime() < Date.now()) {
            handleTokenRefresh();
        } else if (token) {
            loadUserData();
        }
    }, [token, loadUserData, handleTokenRefresh]);

    const login = useCallback(
        async (email: string, password: string) => {
            setLoading(true);
            try {
                const { data } = await api.post<SuccessResponse<Token>>(
                    `/auth/login`,
                    {
                        email,
                        password,
                    }
                );
                const newToken = parseToken(data.data);
                setToken(newToken);
                localStorage.setItem('token', JSON.stringify(newToken));
                await loadUserData();

                return true;
            } catch (error) {
                console.error('Erro de login', error);
                logout();
                setLoading(false);
                return false;
            }
        },
        [loadUserData]
    );

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        setLoading(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading,
                refresh: loadUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
