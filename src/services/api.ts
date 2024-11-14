import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const tokenData = localStorage.getItem('token');
        if (tokenData) {
            try {
                const parsedToken = JSON.parse(tokenData);
                if (parsedToken && parsedToken.accessToken) {
                    config.headers['Authorization'] = `Bearer ${parsedToken.accessToken}`;
                }
            } catch (error) {
                console.error('Erro ao parsear o token:', error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
