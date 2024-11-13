import {
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import SignInForm from './sign-in-form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthProvider';
import { useAuthUI } from '@/contexts/AuthUIProvider';


export default function SignIn() {
    const { login } = useAuth();
    const { setIsModalShown } = useAuthUI();
    const { toast } = useToast();

    const handleLogin = async (email: string, password: string) => {
        const result = await login(email, password);
        if (result) {
            toast({
                title: 'Login bem-sucedido!',
                description: 'Você foi autenticado com sucesso.',
                variant: 'success',
            });
            setIsModalShown(false);
        } else {
            toast({
                title: 'Erro no login',
                description: 'Email ou senha incorretos.',
                variant: 'destructive',
            });
        }
    };
    return (
        <DialogContent className="max-w-[420px]">
            <DialogHeader>
                <DialogTitle>Welcome</DialogTitle>
                <DialogDescription>Sign in into your account</DialogDescription>
            </DialogHeader>
            <div>
                <SignInForm
                    login={handleLogin}
                />
            </div>
        </DialogContent>
    );
}
