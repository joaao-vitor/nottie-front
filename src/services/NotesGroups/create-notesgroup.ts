import { Workstation } from '@/@types/Workstation';
import api from '../api';
import ErrorConverter from '@/utils/errorConverter';
import { SuccessResponse } from '@/@types/SuccessResponse';

export const createNotesGroup = async (
    workstation: Workstation,
    name: string
) => {
    try {
        const response = await api.post(`/notesgroup`, {
            workstationId: workstation.id,
            name,
        });

        return response.data as SuccessResponse<null>;
    } catch (error) {
        throw new Error(
            ErrorConverter(error).message ||
                'Something went wrong while creating your notes group'
        );
    }
};
