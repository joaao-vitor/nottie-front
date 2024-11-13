import { Button } from '@/components/ui/button';
import { ArrowLeft, BadgeCheck, LoaderCircle } from 'lucide-react';

export function LoadingResendTitle() {
    return (
        <div className="flex gap-2">
            <LoaderCircle className="animate-spin" />
            Sending your email...
        </div>
    );
}

export function LoadingResendCardDescription() {
    return <div>Wait a minute while we send your e-mail</div>;
}

export function ResendTitle() {
    return (
        <div className="flex items-center gap-2">
            <BadgeCheck className="animate-in zoom-in text-green-700" />
            Check your mailbox
        </div>
    );
}

export function ResendCardContent() {
    return (
        <div className="flex flex-col gap-4">
            We sent you a new confirmation email, check your mailbox
            <div className="flex flex-col">
                <Button className="flex items-center">
                    <ArrowLeft size={10} />
                    Go Home
                </Button>
            </div>
        </div>
    );
}
