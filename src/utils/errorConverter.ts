import { ErrorResponse } from '@/@types/ErrorResponse';
import { AxiosError } from 'axios';

export default function e(error: any) {
    const err = error as AxiosError;
    return err.response?.data as ErrorResponse;
}
