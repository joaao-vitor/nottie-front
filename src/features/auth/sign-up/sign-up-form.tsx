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
import { SignType, useAuthUI } from '@/contexts/AuthUIProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type SignUpFormProps = {
    register: Function;
    loading: boolean;
};

export interface UserRegister {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export default function SignUpForm({ register, loading }: SignUpFormProps) {
    const { setSignType } = useAuthUI();
    const formSchema = z.object({
        firstName: z
            .string()
            .min(2, 'First name must have at least 2 characters.')
            .max(50, 'First name can have at most 50 characters.'),
        lastName: z
            .string()
            .min(2, 'Last name must have at least 2 characters.')
            .max(50, 'Last name can have at most 50 characters.'),
        email: z.string().email('Email must be a valid email address.'),
        password: z
            .string()
            .min(8, 'Password must have at least 8 characters.')
            .regex(
                /[A-Z]/,
                'Password must contain at least one uppercase letter.'
            )
            .regex(
                /[a-z]/,
                'Password must contain at least one lowercase letter.'
            )
            .regex(/[0-9]/, 'Password must contain at least one number.')
            .regex(
                /[@$!%*?&#]/,
                'Password must contain at least one special symbol.'
            ),
        confirmPassword: z.string(),
    });

    const validationSchema = formSchema.refine(
        (data) => data.password === data.confirmPassword,
        {
            message: 'Passwords do not match.',
            path: ['confirmPassword'],
        }
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) =>
        register({
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            firstName: values.firstName,
            lastName: values.lastName,
        });
    return (
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
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail
                                            size={15}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10"
                                        />
                                        <Input
                                            type="email"
                                            placeholder="Type your email"
                                            {...field}
                                            id="email"
                                            className="pl-8"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <LockKeyhole
                                            size={15}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10"
                                        />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Type your password"
                                            {...field}
                                            className="pl-8"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="confirmPassword">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <LockKeyhole
                                            size={15}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10"
                                        />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Type your password again"
                                            {...field}
                                            className="pl-8"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mt-6 space-y-2">
                    <Button
                        type="submit"
                        className="w-full font-semibold"
                        disabled={loading}
                    >
                        Sign-up
                    </Button>
                    <Button
                        variant={'link'}
                        className="w-full"
                        type="button"
                        onClick={() => setSignType(SignType.SIGNIN)}
                        disabled={loading}
                    >
                        Already have an account?
                    </Button>
                </div>
            </form>
        </Form>
    );
}
