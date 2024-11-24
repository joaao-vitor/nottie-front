import HeaderDashboard from '@/features/dashboard/header/header-dashboard-component';
import { DashboardHeaderPath } from '@/features/dashboard/header/header-dashboard-component';
import { useDashboard } from '@/hooks/use-dashboard';

export default function HomeDashboardPage() {
    const { selectedWorkstation } = useDashboard();

    const headerPath: DashboardHeaderPath[] = [
        {
            title: 'Workstations',
            link: '/',
        },
        {
            title: selectedWorkstation?.name || '',
            link: '/',
        },
    ];
    return (
        <div>
            <HeaderDashboard headerPath={headerPath} />
            <main className="p-5">
                <h1 className="text-2xl">{selectedWorkstation?.name}</h1>
            </main>
        </div>
    );
}
