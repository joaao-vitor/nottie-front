import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import StudyImg from '../assets/Studying-pana.svg';
import { SignType, useAuthUI } from '@/contexts/AuthUIProvider';
import { useAuth } from '@/hooks/use-auth';
import { Navigate } from 'react-router';
function HomePage() {
    const { user } = useAuth();
    const { setIsModalShown, setSignType } = useAuthUI();
    const handleLoginClick = () => {
        setSignType(SignType.SIGNUP);
        setIsModalShown(true);
    };
    
    if (user) {
        return <Navigate to={'/dashboard'} />;
    }

    return (
        <>
            <main className="flex flex-col  justify-center items-center gap-12 p-6">
                <div className="flex items-center justify-center flex-col mt-12 gap-1 max-w-[650px]  text-center">
                    <h1 className="text-5xl font-bold">
                        Write everything down now. Organize your plans. Gather
                        your team.
                    </h1>
                    <h2 className="text-2xl mt-2 font-light">
                        Improve your school performance with{' '}
                        <strong className="font-semibold">Nottie</strong>
                    </h2>
                    <div className="mt-3">
                        <Button
                            className="flex items-center gap-2"
                            onClick={handleLoginClick}
                        >
                            Start now
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
                <img src={StudyImg} className="w-[200px] sm:w-[400px] -mt-5" />
            </main>
        </>
    );
}

export default HomePage;
