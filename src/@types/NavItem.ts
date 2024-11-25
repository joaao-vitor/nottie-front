import { LucideIcon } from 'lucide-react';

export interface DropdownItem {
    name: string;
    icon?: LucideIcon;
    onClick: (event?: React.MouseEvent) => void;
    isShown?: boolean;
}

export interface NavSubItem {
    name: string;
    url: string;
    dropdownMenuItems?: DropdownItem[];
}

export interface NavItem {
    name: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: NavSubItem[];
    showPlusIcon?: boolean;
    plusIconOnClick?: (event?: React.MouseEvent) => void;
}
