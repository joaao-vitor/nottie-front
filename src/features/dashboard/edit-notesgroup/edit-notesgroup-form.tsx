import { WorkstationNoteGroup } from '@/@types/Workstation';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDashboard } from '@/hooks/use-dashboard';
import { useToast } from '@/hooks/use-toast';
import { editNotesGroup } from '@/services/NotesGroups/edit-notesgroup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Min. 3 characters' })
        .max(30, { message: 'Max. 30 characters' }),
});

type EditNotesGroupFormProps = {
    setDialogOpen: (open: boolean) => void;
    notesGroup: WorkstationNoteGroup;
};
export const EditNotesGroupForm = ({
    setDialogOpen,
    notesGroup,
}: EditNotesGroupFormProps) => {
    const { refresh } = useDashboard();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: notesGroup.name,
        },
    });
    const onSubmit = () => {
        setLoading(true);
        notesGroup &&
            editNotesGroup(notesGroup, form.getValues('name'))
                .then((data) => {
                    toast({
                        title: 'Edited!',
                        description: data?.message,
                        variant: 'success',
                    });
                    refresh();
                    setDialogOpen(false);
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
    const handleCancel = () => {
        form.reset();
        setDialogOpen(false);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Notes group's Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-2">
                    <Button
                        onClick={handleCancel}
                        type="button"
                        variant={'secondary'}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};
