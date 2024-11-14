import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type EditProfileFormProps = {
    submit: Function;
    loading: boolean;
};

export const EditProfileForm = ({ submit, loading }: EditProfileFormProps) => {
    const [profileImg, setProfileImg] = useState<File | null>(null);
    const { user } = useAuth();

    const formSchema = z.object({
        firstName: z
            .string()
            .min(2, 'First name must have at least 2 characters.')
            .max(50, 'First name can have at most 50 characters.'),
        lastName: z
            .string()
            .min(2, 'Last name must have at least 2 characters.')
            .max(50, 'Last name can have at most 50 characters.'),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
        },
    });

    const handleChangeProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setProfileImg(files[0]);
    };

    const onSubmit = () => {
        submit(
            form.getValues('firstName'),
            form.getValues('lastName'),
            profileImg
        );
    };
    return (
        <>
            <div className="grid gap-4">
                <div className="flex items-center justify-center mb-3">
                    <img
                        src={
                            profileImg
                                ? URL.createObjectURL(profileImg)
                                : user?.profileImg
                        }
                        className="w-[90px] rounded-full object-cover"
                    />
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="firstName">
                                            First Name
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="Type your first name"
                                                    {...field}
                                                    id="firstName"
                                                    className=""
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="lastName">
                                            Last Name
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="Type your last name"
                                                    {...field}
                                                    id="lastName"
                                                    className=""
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>
            <div className="grid w-full items-center gap-3">
                <Label htmlFor="picture">Profile picture</Label>
                <Input
                    id="picture"
                    type="file"
                    multiple={false}
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleChangeProfileImg}
                />
            </div>

            <DialogFooter>
                <Button type="submit" onClick={onSubmit} disabled={loading}>
                    Save changes
                </Button>
            </DialogFooter>
        </>
    );
};
