import HeaderDashboard from '@/features/dashboard/header/header-dashboard-component';
import { DashboardHeaderPath } from '@/features/dashboard/header/header-dashboard-component';

const headerPath: DashboardHeaderPath[] = [
    {
        title: 'Home',
        link: '/',
    },
    
    {
        title: 'Teste',
        link: '/',
    },
];

export default function HomeDashboardPage() {
    return (
        <div>
            <HeaderDashboard headerPath={headerPath} />
        </div>
    );
}
