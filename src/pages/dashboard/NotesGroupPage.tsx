import { NotesGroup } from '@/@types/NotesGroup';
import { useToast } from '@/hooks/use-toast';
import { getNotesGroup } from '@/services/NotesGroups/get-notesgroup';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function NotesGroupPage() {
    const [loading, setLoading] = useState(false);
    const [notesGroup, setNotesGroup] = useState<NotesGroup | null>(null);

    const {id} = useParams();

    const navigate = useNavigate();
    const {toast} = useToast();
    useEffect(() => {
        setLoading(true);

        getNotesGroup(Number(id)).then(response => {
            setNotesGroup(response.data);
        }).catch((error) => {
            toast({
                title: 'Error!',
                description: error.message,
                variant: 'destructive'
            })

            navigate('/dashboard');
        })
    }, []);
    return <div>NotesGroup</div>;
}
