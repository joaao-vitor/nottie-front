import { Outlet } from 'react-router';
import Header from '../header/header.component';

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
