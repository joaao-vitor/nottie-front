import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { BriefcaseBusinessIcon, PencilIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { CreateNotesGroupForm } from './create-notesgroup-form';

type CreateNotesGroupProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

export const CreateNotesGroup = ({
    isOpen,
    setIsOpen,
}: CreateNotesGroupProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex gap-2 items-center">
                        <PencilIcon size={25} strokeWidth={1.2} />
                        Creating a notes group
                    </DialogTitle>
                    <DialogDescription>
                        Let's create a new notes group, fill the form below and
                        click submit.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <CreateNotesGroupForm setDialogOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    );
};
