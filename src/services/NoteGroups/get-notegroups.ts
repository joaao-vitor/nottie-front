import api from "../api";

export async function getNoteGroups(workstationId: number) {
    try {
        await api.get(`/workstation/${workstationId}/notegroups`)
    } catch (error) {}
}
