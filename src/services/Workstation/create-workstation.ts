import api from '../api';
import { WorkstationType } from '@/@types/Workstation';
import { SuccessResponse } from '@/@types/SuccessResponse';
import { User } from '@/contexts/AuthProvider';
import ErrorConverter from '@/utils/errorConverter';

export const createWorkstation = async (
    user: User,
    name: string,
    type: WorkstationType
) => {
    if (!user) return;

    try {
        const response = await api.post(`/workstation`, {
            userId: user?.id,
            name,
            type,
        });

        return response.data as SuccessResponse<null>;
    } catch (error) {
        
        throw new Error(
            ErrorConverter(error).message ||
                'Something went wrong while updating your profile'
        );
    }
};
