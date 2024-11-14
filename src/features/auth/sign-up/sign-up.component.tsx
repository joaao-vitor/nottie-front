import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import SignUpForm, { UserRegister } from './sign-up-form';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import VerifyEmailNotice from './verify-email-notice';
import { SignType } from '@/contexts/AuthUIProvider';
import api from '@/services/api';
import { SuccessResponse } from '@/@types/SuccessResponse';
import errorConverter from '@/utils/errorConverter';

export default function SignUp() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const handleRegister = async (user: UserRegister) => {
        try {
            setLoading(true);
            await api.post<SuccessResponse<null>>(`/auth/register`, user);

            toast({
                title: 'Success!',
                description: 'Verify your email account',
                variant: 'success',
            });

            setRegistered(true);
        } catch (error) {
            const err = errorConverter(error);
            toast({
                title: 'Error!',
                description: err.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <DialogContent className="max-w-[420px]">
            <DialogHeader>
                {!registered && (
                    <>
                        <DialogTitle>Welcome</DialogTitle>
                        <DialogDescription>
                            Create a new account
                        </DialogDescription>
                    </>
                )}
            </DialogHeader>
            <div>
                {!registered ? (
                    <SignUpForm register={handleRegister} loading={loading} />
                ) : (
                    <VerifyEmailNotice />
                )}
            </div>
        </DialogContent>
    );
}
