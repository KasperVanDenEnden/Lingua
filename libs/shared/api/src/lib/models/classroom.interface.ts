import { Id } from "./id";

export interface IClassroom {
    _id: Id;

    location: Id; // location Id

    slug: string;
    capacity: number;
    floor:number;

    hasMonitor: boolean;
}

export type ICreateClassroom = Pick<IClassroom, 'location' |'capacity' | 'floor' | 'hasMonitor'>;
export type IUpdateClassroom = Partial<Omit<IClassroom, 'id'>>;
export type IUpsertClassroom = IClassroom;