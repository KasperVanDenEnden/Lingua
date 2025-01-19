import { Id } from "./id";

export interface ILesson {
    class: Id;

    classroom: Id; // classroom Id
    teacher: Id; // teacher Id

    title:string;
    description: string;

    startTime: Date;
    endTime: Date;
}

export type ICreateLesson = Pick<ILesson, 'class' | 'classroom' |'teacher' | 'startTime' | 'endTime'>;
export type IUpdateLesson = Partial<Omit<ILesson, 'id'>>;
export type IUpsertLesson = ILesson;