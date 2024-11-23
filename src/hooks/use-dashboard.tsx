import { DashboardContext, DashboardContextType } from '@/contexts/DashboardProvider';
import { useContext } from 'react';

export const useDashboard = (): DashboardContextType => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error(
            'useDashboard must be used within an DashboardProvider'
        );
    }
    return context;
};
