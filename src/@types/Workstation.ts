export interface Workstation {
    id: number;
    name: string;
    type: WorkstationType;
    notesGroups: WorkstationNoteGroup[];
    leaders: WorkstationLeader[];
}

export interface WorkstationLeader {
    id: number;
    firstName: string;
    lastName: string;
    profileImg: string;
}

export interface WorkstationNoteGroup {
    id: number;
    name: string;
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
