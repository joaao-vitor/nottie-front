import { Button } from '@/components/ui/button';
import { SignType, useAuthUI } from '@/contexts/AuthUIProvider';
import { BadgeCheck, BadgeX, LoaderCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function ConfirmEmailSuccessCardTitle() {
    return (
        <div className="flex items-center gap-2">
            <BadgeCheck className="animate-in zoom-in text-green-700" />
            Ready to go!
        </div>
    );
}

export function ConfirmEmailLoadingCardTitle() {
    return (
        <div className="flex gap-2 items-center">
            <LoaderCircle className="animate-spin" />
            Confirming your email...
        </div>
    );
}

export function ConfirmEmailLoadingCardDescription() {
    return <div>Wait a minute while we confirm your e-mail</div>;
}

export function ConfirmEmailErrorCardTitle() {
    return (
        <div className="flex items-center gap-2">
            <BadgeX className="animate-in zoom-in text-red-700" />
            Something went wrong
        </div>
    );
}

export function ConfirmEmailSuccessCardContent() {
    return (
        <div className="flex flex-col gap-4">
            Your email has been confirmed successfully, you can now access all
            features.
            <div className="space-y-2">
                <SignInButton/>
                <NavLink to={'/'}>
                    <Button variant={'link'}>Back home</Button>
                </NavLink>
            </div>
        </div>
    );
}

export function ConfirmEmailErrorCardContent({
    errorMessage,
    resendEmail,
}: {
    errorMessage?: string;
    resendEmail: Function;
}) {
    return (
        <div className="flex flex-col gap-4">
            A error occured while trying confirm your email:{' '}
            {errorMessage?.toLowerCase() || ''}
            <div className="flex flex-col gap-1">
                <Button onClick={() => resendEmail()}>Try resend email</Button>
                <SignInButton variant="link" />
            </div>
        </div>
    );
}

function SignInButton({
    variant,
}: {
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link'
        | null
        | undefined;
}) {
    const { setIsModalShown, setSignType } = useAuthUI();

    return (
        <Button
            variant={variant || 'default'}
            onClick={() => {
                setSignType(SignType.SIGNIN);
                setIsModalShown(true);
            }}
        >
            Sign in
        </Button>
    );
}
