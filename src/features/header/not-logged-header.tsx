import { ModeToggle } from '@/components/mode-toggler';
import { Button } from '@/components/ui/button';
import Sign from '../auth/sign.component';
import { SignType, useAuthUI } from '@/contexts/AuthUIProvider';

export const NotLoggedHeader = () => {
    const { setSignType, setIsModalShown } = useAuthUI();

    const openSign = (type: SignType) => {
        setSignType(type);
        setIsModalShown(true);
    };
    return (
        <>
            <div className="flex gap-2">
                <Button
                    variant={'ghost'}
                    onClick={() => openSign(SignType.SIGNIN)}
                >
                    Login
                </Button>
                <Button onClick={() => openSign(SignType.SIGNUP)}>
                    Get into Nottie
                </Button>
                <ModeToggle />
            </div>
            <Sign />
        </>
    );
};
