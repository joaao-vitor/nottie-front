import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from '@/components/ui/sidebar';
import WorkstationSwitcher from './workstation-switcher';
import { useAuth } from '@/hooks/use-auth';
import { FeaturesNav } from './features-nav';

export default function SideBar() {
    const { user } = useAuth();
    console.log(user);
    if (!user) return;
    return (
        <Sidebar variant={'inset'} collapsible={'icon'}>
            <SidebarHeader>
                <WorkstationSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <FeaturesNav />
            </SidebarContent>
        </Sidebar>
    );
}
