import { ErrorResponse } from '@/@types/ErrorResponse';
import { AxiosError } from 'axios';

export default function ErrorConverter(error: any) {
    const err = error as AxiosError;
    return err.response?.data as ErrorResponse;
}
