import './App.css';
import { Toaster } from './components/ui/toaster';
import { RouterProvider } from 'react-router/dom';

import router from './router';

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    );
}

export default App;
