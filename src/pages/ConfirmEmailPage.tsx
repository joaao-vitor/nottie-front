import { ErrorResponse } from '@/@types/ErrorResponse';
import Header from '@/components/header/header.component';
import ConfirmEmailCard from '@/features/auth/confirm-email/confirm-email-card.component';
import { useToast } from '@/hooks/use-toast';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ConfirmEmailPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
    const [success, setSuccess] = useState(false);
    const [resent, setResent] = useState(false);
    const [error, setError] = useState('');

    const { toast } = useToast();

    const token = searchParams.get('token');

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);
        axios
            .put(
                `${import.meta.env.VITE_API_URL}/auth/confirm-email?token=${token}`,
                { signal }
            )
            .then(() => {
                setSuccess(true);
            })
            .catch((err) => {
                let errorAxios = err as AxiosError<ErrorResponse>;
                console.error('Error while verifying email', errorAxios);
                setError(errorAxios.response?.data?.message || "Unknown error");
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    const resendEmail = async () => {
        setLoadingResend(true);
        try {
            await axios.put(
                `${
                    import.meta.env.VITE_API_URL
                }/auth/resend-confirm-email?token=${token}`
            );
            toast({
                title: 'Success!',
                description: 'Confirmation email resent.',
                variant: 'success',
            });
            setResent(true);
        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            toast({
                title: 'Something went wrong',
                description: err.message,
                variant: 'destructive',
            });
            setResent(true);
        } finally {
            setLoadingResend(false);
        }
    };

    return (
        <>
            <Header />
            <ConfirmEmailCard
                loadingResend={loadingResend}
                resent={resent}
                resendEmail={resendEmail}
                loading={loading}
                success={success}
                errorMessage={error}
            />
        </>
    );
}
