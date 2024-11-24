import { ChevronRight, MoreHorizontal, Plus, PlusIcon } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { DropdownItem, NavItem, NavSubItem } from '@/@types/NavItem';
import {
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { NavLink } from 'react-router';

type NavMainProps = {
    items: NavItem[];
    navLabel: string;
};

const dropdownItems = (dropdownItems: DropdownItem[]) => {
    return dropdownItems.map((dropdownItem) => (
        <DropdownMenuItem asChild key={dropdownItem.name}>
            <SidebarMenuButton
                tooltip={dropdownItem.name}
                className="flex justify-between"
                onClick={dropdownItem.onClick}
            >
                <span>{dropdownItem.name}</span>
                {dropdownItem.icon && <dropdownItem.icon />}
            </SidebarMenuButton>
        </DropdownMenuItem>
    ));
};

const subMenuItems = (subMenuItems: NavSubItem[]) => {
    const { isMobile } = useSidebar();

    return subMenuItems.map((subItem) => (
        <DropdownMenu key={`dropdown-${subItem.name}`}>
            <SidebarMenuSubItem key={subItem.name}>
                <SidebarMenuButton
                    variant={'noPadding'}
                    asChild
                    className="data-[state=open]:bg- sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <NavLink to={`./${subItem.url}`}>
                        {subItem.name}{' '}
                        {subItem.dropdownMenuItems?.length && (
                            <DropdownMenuTrigger asChild>
                                <MoreHorizontal className="ml-auto" />
                            </DropdownMenuTrigger>
                        )}
                    </NavLink>
                </SidebarMenuButton>
            </SidebarMenuSubItem>
            {subItem.dropdownMenuItems?.length && (
                <DropdownMenuContent
                    side={isMobile ? 'bottom' : 'right'}
                    align={isMobile ? 'end' : 'start'}
                    className="min-w-56 rounded-lg"
                >
                    {dropdownItems(subItem.dropdownMenuItems)}
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    ));
};

export function NavMain({ items, navLabel }: NavMainProps) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{navLabel}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.name}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.name}>
                                    {item.icon && <item.icon />}
                                    <span>{item.name}</span>

                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>

                            {item.showPlusIcon && item.plusIconOnClick && (
                                <SidebarMenuAction
                                    onClick={item.plusIconOnClick}
                                >
                                    <Plus />{' '}
                                    <span className="sr-only">Add</span>
                                </SidebarMenuAction>
                            )}
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {subMenuItems(item.items || [])}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
