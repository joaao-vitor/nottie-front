import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from '@/components/ui/sidebar';
import WorkstationSwitcher from './workstation-switcher';
import { useAuth } from '@/hooks/use-auth';
import { WorkstationType } from '@/@types/Workstation';
export default function SideBar() {
    const { user } = useAuth();
    console.log(user);
    if (!user) return;
    return (
        <Sidebar variant={'inset'} collapsible={'icon'}>
            <SidebarHeader>
                <WorkstationSwitcher
                    workstations={user.workstations}
                    defaultWorkstation={
                        user.workstations.find(
                            (v) => v.type === WorkstationType.PERSONAL
                        ) || user.workstations[0]
                    }
                />
            </SidebarHeader>
            <SidebarContent></SidebarContent>
        </Sidebar>
    );
}
