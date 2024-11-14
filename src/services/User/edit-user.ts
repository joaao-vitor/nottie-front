// src/services/userService.js
import { SuccessResponse } from '@/@types/SuccessResponse';
import errorConverter from '@/utils/errorConverter';
import api from '../api';

export const editUser = async (
    userId: number,
    firstName: string,
    lastName: string
) => {
    try {
        const response = await api.put(
            `${import.meta.env.VITE_API_URL}/user/${userId}`,
            {
                firstName,
                lastName,
            }
        );

        const data = response.data as SuccessResponse<null>;
        return data;
    } catch (error) {
        throw new Error(
            errorConverter(error).message ||
                'Something went wrong while updating your profile'
        );
    }
};

export const editProfileImage = async (userId: number, image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
        const response = await api.patch(
            `/user/profile-img/${userId}`,
            formData
        );
        return response.data as SuccessResponse<null>;
    } catch (error) {
        throw new Error(
            errorConverter(error).message ||
                'Something went wrong while uploading image'
        );
    }
};
