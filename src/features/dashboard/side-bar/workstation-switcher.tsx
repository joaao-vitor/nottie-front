import { WorkstationMenuItem, WorkstationType } from '@/@types/Workstation';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    Building2Icon,
    ChevronsUpDown,
    CircleUserIcon,
    Plus,
} from 'lucide-react';
import { useState } from 'react';
import CreateWorkstation from '../create-workstation/create-workstation.component';
import { useDashboard } from '@/hooks/use-dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

type WorkstationSwitcherProps = {};

const WorkstationSwitcherSkeleton = () => {
    return (
        <>
            <Skeleton className="flex h-12 items-center p-2">
                <Skeleton className="flex aspect-square size-8 w-fit items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground" />
            </Skeleton>
            <div>
                <Separator />
                {new Array(5).fill(null).map((_, index) => (
                    <SidebarMenuSkeleton key={index} className="w-full" />
                ))}
            </div>
        </>
    );
};

export default function WorkstationSwitcher({}: WorkstationSwitcherProps) {
    const { workstations } = useDashboard();
    const { selectedWorkstation, setSelectedWorkstation } = useDashboard();
    const { isMobile } = useSidebar();

    const [isCreateWorkstationOpen, setIsCreateWorkstationOpen] =
        useState(false);

    if (!workstations) return <WorkstationSwitcherSkeleton />;
    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent  data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <div className="flex aspect-square size-8 w-fit items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    {selectedWorkstation?.type ===
                                    WorkstationType.PERSONAL ? (
                                        <CircleUserIcon
                                            className="shrink-0"
                                            size={20}
                                            strokeWidth={1.2}
                                        />
                                    ) : (
                                        <Building2Icon
                                            size={20}
                                            strokeWidth={1.2}
                                        />
                                    )}
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {selectedWorkstation?.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {selectedWorkstation?.type ===
                                        WorkstationType.PERSONAL
                                            ? 'Personal Workstation'
                                            : 'Group Workstation'}
                                    </span>
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            align="start"
                            side={isMobile ? 'bottom' : 'right'}
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                                Workstations
                            </DropdownMenuLabel>
                            {workstations?.map((workstation, index) => (
                                <DropdownMenuItem
                                    key={workstation.name}
                                    onClick={() =>
                                        setSelectedWorkstation(workstation)
                                    }
                                    className="gap-2 p-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-sm border">
                                        {workstation.type ===
                                        WorkstationType.PERSONAL ? (
                                            <CircleUserIcon
                                                className="shrink-0"
                                                size={20}
                                                strokeWidth={1.2}
                                            />
                                        ) : (
                                            <Building2Icon
                                                size={15}
                                                strokeWidth={1.2}
                                            />
                                        )}
                                    </div>
                                    {workstation.name}
                                    <DropdownMenuShortcut>
                                        ⌘{index + 1}
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="gap-2 p-2"
                                onClick={() => setIsCreateWorkstationOpen(true)}
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Plus className="size-4" />
                                </div>
                                <div className="font-medium text-muted-foreground">
                                    New workstation
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <CreateWorkstation
                isOpen={isCreateWorkstationOpen}
                setIsOpen={setIsCreateWorkstationOpen}
            />
        </>
    );
}
