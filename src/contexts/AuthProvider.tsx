import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
    useCallback,
} from 'react';
import axios, { AxiosError } from 'axios';

interface Token {
    email: string;
    isAuthenticated: boolean;
    created: Date;
    expires: Date;
    accessToken: string;
    refreshToken: string;
}

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    workstations: [];
    personalWorkstation: [];
}

interface AuthContextType {
    user: User | null;
    token: Token | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
            const response = await axios.get<User>(
                `${import.meta.env.VITE_API_URL}/user/me`,
                { headers: { Authorization: `Bearer ${token.accessToken}` } }
            );
            setUser(response.data);
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
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
                { refreshToken: token.refreshToken }
            );
            const newToken = parseToken(data as Token);
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
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/login`,
                    { email, password }
                );
                const newToken = parseToken(data as Token);
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
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
