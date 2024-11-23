export interface Workstation {
    id: number;
    name: string;
    type: WorkstationType;
    noteGroups: [];
}

export interface WorkstationMenuItem {
    id: number;
    name: string;
    type: WorkstationType;
}

export enum WorkstationType {
    PERSONAL = 'PERSONAL',
    GROUP = 'GROUP',
}
