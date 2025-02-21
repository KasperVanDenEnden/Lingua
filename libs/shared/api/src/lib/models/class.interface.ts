import { Id } from './id';
import { IUpsertReview } from './review.interface';
import { IUser } from './user.interface';

export enum ClassStatus {
  Active = 'Active',
  Archived = 'Archived',
}

export enum Language {
  Korean = 'Korean',
  English = 'English',
  Dutch = 'Dutch',
  German = 'German',
  French = 'French',
}

export interface IClass {
  id?: Id;
  _id: Id;
  
  title: string;
  description: string;
  status: ClassStatus;
  createdOn: Date;
  language: Language;

  teacher: Id | IUser; // Id from main teacher
  assistants: Id[] | IUser[]; // Id from teacher assistants
  reviews: IUpsertReview[]; // Nested reviews
}

export type ICreateClass = Pick<
  IClass,
  'status' | 'title' | 'description' | 'language' | 'teacher'
>;
export type IUpdateClass = Partial<Omit<IClass, 'id'>>;
export type IUpsertClass = IClass;

export type IUpdateClassAssistant = {
  class: string,
  assistant: Id
}
