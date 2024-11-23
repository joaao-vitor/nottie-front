export interface WorkstationMenuItem {
    id: number;
    name: string;
    type: WorkstationType;
    notesGroup: [];
}

export enum WorkstationType {
    PERSONAL = 'PERSONAL',
    GROUP = 'GROUP',
}
