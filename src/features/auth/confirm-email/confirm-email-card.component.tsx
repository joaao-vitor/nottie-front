import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    LoadingResendCardDescription,
    LoadingResendTitle,
    ResendCardContent,
    ResendTitle,
} from './resend-items';

import {
    ConfirmEmailErrorCardContent,
    ConfirmEmailErrorCardTitle,
    ConfirmEmailLoadingCardDescription,
    ConfirmEmailLoadingCardTitle,
    ConfirmEmailSuccessCardContent,
    ConfirmEmailSuccessCardTitle,
} from './confirm-items';

type ConfirmEmailCardProps = {
    loading: boolean;
    success: boolean;
    errorMessage?: string;
    resendEmail: () => void;
    loadingResend?: boolean;
    resent?: boolean;
};

export default function ConfirmEmailCard ({
    loading,
    success,
    errorMessage,
    resendEmail,
    loadingResend,
    resent,
}: ConfirmEmailCardProps) {
    return (
        <Card className="w-[420px]">
            <CardHeader>
                <CardTitle>
                    {loading ? (
                        <ConfirmEmailLoadingCardTitle />
                    ) : loadingResend ? (
                        <LoadingResendTitle />
                    ) : (
                        <div>
                            {!resent &&
                                (success ? (
                                    <ConfirmEmailSuccessCardTitle />
                                ) : (
                                    <ConfirmEmailErrorCardTitle />
                                ))}

                            {resent && <ResendTitle />}
                        </div>
                    )}
                </CardTitle>
                <CardDescription>
                    {loading && <ConfirmEmailLoadingCardDescription />}
                    {loadingResend && <LoadingResendCardDescription />}
                </CardDescription>
                {!loading && (
                    <CardContent>
                        {resent && <ResendCardContent />}
                        {!resent &&
                            (success ? (
                                <ConfirmEmailSuccessCardContent />
                            ) : (
                                <ConfirmEmailErrorCardContent
                                    errorMessage={errorMessage}
                                    resendEmail={resendEmail}
                                />
                            ))}
                    </CardContent>
                )}
            </CardHeader>
        </Card>
    );
};

