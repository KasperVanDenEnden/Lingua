import { Id } from './id';

export enum ClassStatus {
    Active = 'Active',
    Archived = 'Archived'
}

export enum Language {
    Korean = 'Korean',
    English = 'English',
    Dutch = 'Dutch',
    German = 'German',
    French = 'French'
}

export interface IClass {
    id: Id;
    title: string;
    description: string;
    status: ClassStatus;
    createdOn:Date;
    language: Language;
    
    teacher: Id; // Id from main teacher
    assistants: Id[]; // Id from teacher assistants
    comments: Comment[];
}

export type ICreateClass = Pick<IClass, 'title' | 'description' | 'language' | 'teacher' | 'assistants'>;
export type IUpdateClass = Partial<Omit<IClass, 'id'>>;
export type IUpsertClass = IClass;