import { Workstation, WorkstationType } from '@/@types/Workstation';
import { useAuth } from '@/hooks/use-auth';
import { getWorkstationsByUser } from '@/services/Workstation/get-workstations';
import { createContext, ReactNode, useEffect, useState } from 'react';

export interface DashboardContextType {
    workstations: Workstation[] | undefined;
    selectedWorkstation: Workstation | undefined;
    setSelectedWorkstation: (selected: Workstation) => void;
}
interface DashboardContextProps {
    children: ReactNode;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

export const DashboardProvider = ({ children }: DashboardContextProps) => {
    const { user } = useAuth();
    const [workstations, setWorkstations] = useState<Workstation[]>([]);
    const [selectedWorkstation, setSelectedWorkstation] = useState<
        Workstation | undefined
    >(undefined);

    useEffect(() => {
        if (user) {
            getWorkstationsByUser(user).then((response) => {
                setWorkstations(response.data || []);
                if (!selectedWorkstation && response.data) {
                    setSelectedWorkstation(
                        response.data?.find(
                            (workstation) =>
                                workstation.type === WorkstationType.PERSONAL
                        ) || response.data[0]
                    );
                }
            });
        }
    }, [user, getWorkstationsByUser]);

    return (
        <DashboardContext.Provider
            value={{
                selectedWorkstation,
                setSelectedWorkstation,
                workstations,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
