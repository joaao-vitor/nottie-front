import { User } from '@/contexts/AuthProvider';
import api from '../api';
import { SuccessResponse } from '@/@types/SuccessResponse';
import { Workstation } from '@/@types/Workstation';
import ErrorConverter from '@/utils/errorConverter';

export const getWorkstationsByUser = async (user: User) => {
    try {
        const response = await api.get(`/workstation/user/${user.id}`);
        return response.data as SuccessResponse<Workstation[]>;
    } catch (error) {
        throw new Error(
            ErrorConverter(error).message ||
                'Something went wrong while fetching your workstations'
        );
    }
};
