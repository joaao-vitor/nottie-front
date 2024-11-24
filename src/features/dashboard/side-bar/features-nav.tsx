import { useDashboard } from '@/hooks/use-dashboard';
import { NavMain } from './nav-main';
import { NavItem } from '@/@types/NavItem';
import { EditIcon, PencilIcon, TrashIcon } from 'lucide-react';

export function FeaturesNav() {
    const { selectedWorkstation } = useDashboard();

    if (!selectedWorkstation?.notesGroups) return;
    const notesGroupsItems = selectedWorkstation?.notesGroups.map(
        (noteGroup) => ({
            name: noteGroup.name,
            url: `notegroup/${noteGroup.id}`,
        })
    );

    const noteGroups: NavItem = {
        name: 'Note Groups',
        url: '',
        icon: PencilIcon,
        items: notesGroupsItems.map((item) => ({
            ...item,
            dropdownMenuItems: [
                {
                    name: 'Delete',
                    icon: TrashIcon,
                    onClick: () => {},
                },

                {
                    name: 'Edit',
                    icon: EditIcon,
                    onClick: () => {},
                },
            ],
        })),
    };
    return (
        selectedWorkstation && (
            <NavMain items={[noteGroups]} navLabel="Features" />
        )
    );
}
