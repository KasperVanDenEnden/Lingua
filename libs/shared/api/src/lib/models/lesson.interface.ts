import { Id } from "./id";

export interface ILesson {
    class: Id;

    room: Id; // Room Id
    teacher: Id; // teacher Id

    title:string;
    description: string;

    startTime: Date;
    endTime: Date;
}

export type ICreateLesson = Pick<ILesson, 'class' | 'room' |'teacher' | 'startTime' | 'endTime'>;
export type IUpdateLesson = Partial<Omit<ILesson, 'id'>>;
export type IUpsertLesson = ILesson;