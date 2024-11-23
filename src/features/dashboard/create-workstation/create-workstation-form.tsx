import { WorkstationType } from '@/@types/Workstation';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { createWorkstation } from '@/services/Workstation/create-workstation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import errorConverter from '@/utils/errorConverter';

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Min. 3 characters' })
        .max(30, { message: 'Max. 30 characters' }),
    type: z.nativeEnum(WorkstationType, {
        required_error: 'Please select a workstation type',
    }),
});

type CreateWorkstationFormProps = {
    setDialogOpen: (open: boolean) => void;
};
export default function CreateWorkstationForm({
    setDialogOpen,
}: CreateWorkstationFormProps) {
    const { user, refresh } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = () => {
        setLoading(true);
        user &&
            createWorkstation(
                user,
                form.getValues('name'),
                form.getValues('type')
            )
                .then((data) => {
                    toast({
                        title: 'Created!',
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
                                    placeholder="Workstation's Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Workstation Type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem
                                                value={WorkstationType.PERSONAL}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Personal
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem
                                                value={WorkstationType.GROUP}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Group
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
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
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    );
}
