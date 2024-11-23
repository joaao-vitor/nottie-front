import { NotLoggedHeader } from './not-logged-header';
import { LoggedHeader } from './logged-header';
import { useAuth } from '@/hooks/use-auth';

export default function Header() {
    const { user } = useAuth();
    return (
        <header className="p-6 flex justify-between">
            <h1 className="text-xl font-semibold">Nottie</h1>
            {user ? <LoggedHeader /> : <NotLoggedHeader />}
        </header>
    );
}
