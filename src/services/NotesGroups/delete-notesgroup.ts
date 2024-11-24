import ErrorConverter from '@/utils/errorConverter';
import api from '../api';

export const deleteNotesGroup = async (notesGroupId: Number) => {
    try {
        await api.delete(`/notesgroup/${notesGroupId}`);
    } catch (error) {
        throw new Error(
            ErrorConverter(error).message ||
                'Something went wrong while deleting the notes group'
        );
    }
};
