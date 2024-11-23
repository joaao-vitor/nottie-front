export interface WorkstationMenuItem {
    id: number;
    name: string;
    type: WorkstationType;
}

export enum WorkstationType {
    PERSONAL = 'PERSONAL',
    GROUP = 'GROUP',
}
