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
import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignType, useAuthUI } from '@/contexts/AuthUIProvider';
import { useAuth } from '@/hooks/use-auth';

type SignInFormProps = {
    login: Function;
};

export default function SignInForm({ login }: SignInFormProps) {
    const { loading } = useAuth();
    const { setSignType } = useAuthUI()

    const formSchema = z.object({
        email: z.string().email('Insert a valid e-mail'),
        password: z.string(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) =>
        login(values.email, values.password);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl defaultValue={''}>
                                    <div className="relative">
                                        <Mail
                                            size={15}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10"
                                        />
                                        <Input
                                            type="email"
                                            placeholder="Type your email"
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl defaultValue={''}>
                                    <div className="relative">
                                        <LockKeyhole
                                            size={15}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10"
                                        />
                                        <Input
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
                </div>
                <div className="mt-6 space-y-2">
                    <Button
                        type="submit"
                        className="w-full font-semibold"
                        disabled={loading}
                    >
                        Sign-in
                    </Button>
                    <Button
                        variant={'link'}
                        className="w-full"
                        disabled={loading}
                        type="button"
                        onClick={() => setSignType(SignType.SIGNUP)}
                    >
                        Create your account
                    </Button>
                </div>
            </form>
        </Form>
    );
}
