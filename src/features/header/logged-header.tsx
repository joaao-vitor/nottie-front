import { UserAvatar } from '@/components/user-avatar';
import { useAuth } from '@/contexts/AuthProvider';
import { UserDropdown } from './user-dropdown';

export const LoggedHeader = () => {
    return <div>{<UserDropdown />}</div>;
};
