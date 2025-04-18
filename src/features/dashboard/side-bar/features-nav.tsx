import { useDashboard } from '@/hooks/use-dashboard';
import { NavMain } from './nav-main';
import { NavItem } from '@/@types/NavItem';
import { EditIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { deleteNotesGroup } from '@/services/NotesGroups/delete-notesgroup';
import { useToast } from '@/hooks/use-toast';
import { CreateNotesGroup } from '../create-notesgroup/create-notesgroup.component';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { isLeader } from '@/utils/isLeader';
import { WorkstationNoteGroup } from '@/@types/Workstation';
import { EditNotesGroup } from '../edit-notesgroup/edit-notesgroup.component';

export function FeaturesNav() {
    const { selectedWorkstation, refresh } = useDashboard();
    const { user } = useAuth();
    const [newNoteGroupDialog, setNewNoteGroupDialog] = useState(false);
    const [editNoteGroupDialog, setEditGroupDialog] = useState(false);
    const [noteGroupSelected, setNoteGroupSelected] =
        useState<WorkstationNoteGroup | null>(null);
    const { toast } = useToast();

    const deleteNoteGroup = (notesGroupId: number) => {
        deleteNotesGroup(notesGroupId)
            .then(() => {
                toast({
                    title: 'Success!',
                    description: 'Note group deleted successfully',
                    variant: 'success',
                });
            })
            .catch((error) => {
                toast({
                    title: 'Error!',
                    description: error.message,
                    variant: 'destructive',
                });
            })
            .finally(() => {
                refresh();
            });
    };

    if (!selectedWorkstation?.notesGroups) return;
    const notesGroupsItems = selectedWorkstation?.notesGroups.map(
        (noteGroup) => ({
            noteGroupId: noteGroup.id,
            name: noteGroup.name,
            url: `notesgroup/${noteGroup.id}`,
        })
    );

    const noteGroups: NavItem = {
        name: 'Note Groups',
        url: '',
        icon: PencilIcon,
        showPlusIcon: !!user && isLeader(selectedWorkstation, user),
        plusIconOnClick: () => {
            setNewNoteGroupDialog(true);
        },
        items: notesGroupsItems.map((item) => ({
            ...item,
            dropdownMenuItems: [
                {
                    name: 'Delete',
                    icon: TrashIcon,
                    onClick: () => {
                        deleteNoteGroup(item.noteGroupId);
                    },
                    isShown: !!user && isLeader(selectedWorkstation, user),
                },

                {
                    name: 'Edit',
                    icon: EditIcon,
                    onClick: () => {
                        setNoteGroupSelected({
                            name: item.name,
                            id: item.noteGroupId,
                        });
                        setEditGroupDialog(true);
                    },
                    isShown: !!user && isLeader(selectedWorkstation, user),
                },
            ],
        })),
    };
    return (
        selectedWorkstation && (
            <>
                <NavMain items={[noteGroups]} navLabel="Features" />
                <CreateNotesGroup
                    isOpen={newNoteGroupDialog}
                    setIsOpen={setNewNoteGroupDialog}
                />
                {noteGroupSelected && (
                    <EditNotesGroup
                        isOpen={editNoteGroupDialog}
                        setIsOpen={setEditGroupDialog}
                        selectedNotesGroup={noteGroupSelected}
                    />
                )}
            </>
        )
    );
}
