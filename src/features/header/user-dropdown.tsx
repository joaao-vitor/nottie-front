import { UserAvatar } from '@/components/user-avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboardIcon,
    LogOutIcon,
    SettingsIcon,
    User2Icon,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EditProfileModal } from '../user-profile/edit-profile-modal';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export const UserDropdown = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const handleLogout = () => {
        logout();
        toast({
            title: 'Logging out...',
            description: 'You have logged out successfully',
        });
    };
    const handleSettings = () => {
        setIsSettingsOpen(true);
    };

    return (
        user && (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <UserAvatar user={user} size="md" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" w-[250px] mr-5 mt-2">
                        <DropdownMenuLabel
                            className="flex items-center gap-x-3"
                            asChild
                        >
                            <NavLink to={``}>
                                <UserAvatar user={user} />
                                {user.firstName} {user?.lastName}
                            </NavLink>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User2Icon />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LayoutDashboardIcon />
                            Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleSettings}
                        >
                            <SettingsIcon />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOutIcon />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <EditProfileModal
                    isOpen={isSettingsOpen}
                    onOpenChange={setIsSettingsOpen}
                />
            </>
        )
    );
};
