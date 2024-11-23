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

type WorkstationSwitcherProps = {
    defaultWorkstation: WorkstationMenuItem;
    workstations: WorkstationMenuItem[];
};

export default function WorkstationSwitcher({
    defaultWorkstation,
    workstations,
}: WorkstationSwitcherProps) {
    console.log(defaultWorkstation, workstations);
    const { isMobile } = useSidebar();

    const [activeWorkstation, setActiveWorkstation] =
        useState<WorkstationMenuItem>(defaultWorkstation);

    const [isCreateWorkstationOpen, setIsCreateWorkstationOpen] =
        useState(false);

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
                                    {activeWorkstation.type ===
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
                                        {activeWorkstation?.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {activeWorkstation.type ===
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
                            {workstations.map((workstation, index) => (
                                <DropdownMenuItem
                                    key={workstation.name}
                                    onClick={() =>
                                        setActiveWorkstation(workstation)
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
