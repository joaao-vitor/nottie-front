import { CompactUser } from './Compacts/CompactUser';

export interface NotesGroup {
    id: number;
    name: string;
    creator: CompactUser;
    notes: [];
}
