import { Dialog } from '@/components/ui/dialog';
import SignIn from './sign-in/sign-in.component';
import SignUp from './sign-up/sign-up.component';
import { SignType, useAuthUI } from '@/contexts/AuthUIProvider';



export default function Sign() {
    const {isModalShown, setIsModalShown, signType} = useAuthUI();
    return (
        <Dialog open={isModalShown} onOpenChange={setIsModalShown}>
            {signType === SignType.SIGNIN ? (
                <SignIn />
            ) : (
                <SignUp />
            )}
        </Dialog>
    );
}
