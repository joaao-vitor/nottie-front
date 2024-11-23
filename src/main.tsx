import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './providers/theme-provider.tsx';
import { AuthProvider } from './contexts/AuthProvider.tsx';
import { AuthUIProvider } from './contexts/AuthUIProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <AuthUIProvider>
                    <App />
                </AuthUIProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);
