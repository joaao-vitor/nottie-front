// Header.tsx
import { useAuthUI } from '@/contexts/AuthUIProvider';
import { SignType } from '@/contexts/AuthUIProvider';
import { Button } from '../ui/button';
import Sign from '@/features/auth/sign.component';
import { ModeToggle } from '../mode-toggler';

export default function HeaderContent() {
    const { setSignType, setIsModalShown } = useAuthUI();

    const openSign = (type: SignType) => {
        setSignType(type);
        setIsModalShown(true);
    };

    return (
        <header className="p-6 flex justify-between">
            <h1 className="text-xl font-semibold">Nottie</h1>
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
        </header>
    );
}
