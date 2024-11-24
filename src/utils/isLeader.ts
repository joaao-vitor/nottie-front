import { Workstation } from '@/@types/Workstation';
import { User } from '@/contexts/AuthProvider';

export const isLeader = (workstation: Workstation, user: User) =>
    !!workstation.leaders.find((leader) => leader.id === user.id);
