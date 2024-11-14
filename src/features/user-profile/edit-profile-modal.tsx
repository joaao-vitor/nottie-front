import { SuccessResponse } from '@/@types/SuccessResponse';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { editProfileImage, editUser } from '@/services/User/edit-user';
import { SettingsIcon } from 'lucide-react';
import { useState } from 'react';
import { EditProfileForm } from './edit-profile-form';

type EditProfileModalProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
};
export const EditProfileModal = ({
    isOpen,
    onOpenChange,
}: EditProfileModalProps) => {
    const { toast } = useToast();
    const { user, refresh } = useAuth();
    const [loading, setLoading] = useState(false);

    const edit = async (
        firstName: string,
        lastName: string,
        image: File | null
    ) => {
        if (!user) return;
        setLoading(true);
        const promises: Array<Promise<SuccessResponse<null>>> = [];
        promises.push(editUser(user.id, firstName, lastName));
        if (image) promises.push(editProfileImage(user.id, image));

        Promise.all(promises)
            .then(() => {
                toast({
                    title: 'Success!',
                    description: 'You updated your profile successfully',
                    variant: 'success',
                });

                refresh();
            })
            .catch((error) => {
                toast({
                    title: 'Error!',
                    description: error.message,
                    variant: 'destructive',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex gap-3 items-center">
                        <SettingsIcon size={30} strokeWidth={1} />
                        <span className="font-bold">Edit profile</span>
                    </DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <EditProfileForm submit={edit} loading={loading} />
            </DialogContent>
        </Dialog>
    );
};
