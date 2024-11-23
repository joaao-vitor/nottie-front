import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import CreateWorkstationForm from './create-workstation-form';
import { BriefcaseBusinessIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type CreateWorkstationProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};
export default function CreateWorkstation({
    isOpen,
    setIsOpen,
}: CreateWorkstationProps) {

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex gap-2 items-center">
                        <BriefcaseBusinessIcon size={25} strokeWidth={1.2} />
                        Let's create your new workstation
                    </DialogTitle>
                    <DialogDescription>
                        Customize your new workstation with a unique name that
                        reflect your goals.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <CreateWorkstationForm setDialogOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    );
}
