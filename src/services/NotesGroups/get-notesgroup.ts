import { SuccessResponse } from "@/@types/SuccessResponse"
import api from "../api"
import { NotesGroup } from "@/@types/NotesGroup"
import ErrorConverter from "@/utils/errorConverter"

export const getNotesGroup = async (id: number) => {
    try {
        const response = await api.get(`/notesgroup/${id}`)
        return response.data as SuccessResponse<NotesGroup>
    } catch (error) {
        throw new Error(ErrorConverter(error).message || "Something went wrong while fetching the notes group");
    }
}