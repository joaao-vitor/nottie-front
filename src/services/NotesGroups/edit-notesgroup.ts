import { WorkstationNoteGroup } from '@/@types/Workstation';
import api from '../api';
import { SuccessResponse } from '@/@types/SuccessResponse';
import ErrorConverter from '@/utils/errorConverter';

export const editNotesGroup = async (
    notesGroup: WorkstationNoteGroup,
    name: string
) => {
    try {
        const response = await api.put(`/notesgroup/${notesGroup.id}`, {
            name,
        });

        return response.data as SuccessResponse<null>;
    } catch (error) {
        throw new Error(
            ErrorConverter(error).message ||
                'Something went wrong while editing your notes group'
        );
    }
};
