import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import SideBar from '../dashboard/side-bar/side-bar.component';
import { Outlet } from 'react-router';

export default function DashboardLayout() {
    return (
        <div className="flex h-svh items-center justify-center">
            <SidebarProvider>
                <SideBar />
                <SidebarInset>
                    <main>
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
