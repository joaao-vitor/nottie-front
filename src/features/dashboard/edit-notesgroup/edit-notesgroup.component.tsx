import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { PencilIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { EditNotesGroupForm } from './edit-notesgroup-form';
import { WorkstationNoteGroup } from '@/@types/Workstation';

type EditNotesGroupProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selectedNotesGroup: WorkstationNoteGroup;
};

export const EditNotesGroup = ({
    isOpen,
    setIsOpen,
    selectedNotesGroup,
}: EditNotesGroupProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex gap-4 items-center">
                        <PencilIcon size={25} strokeWidth={1.2} />
                        Editing a notes group
                    </DialogTitle>
                    <DialogDescription>
                        Insert a new name to your notes group below and then click submit!
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <EditNotesGroupForm
                    notesGroup={selectedNotesGroup}
                    setDialogOpen={setIsOpen}
                />
            </DialogContent>
        </Dialog>
    );
};
