import { Id } from './id';

export interface ILesson {
  id?: Id;
  _id: Id;

  class: Id;

  room: Id; // Room Id
  teacher: Id; // Teacher Id
  students: Id[]; // Attending students

  title: string;
  description: string;

  startTime: Date;
  endTime: Date;
}

export type ICreateLesson = Pick<
  ILesson,
  'class' | 'room' | 'teacher' | 'students' | 'startTime' | 'endTime'
>;
export type IUpdateLesson = Partial<Omit<ILesson, 'id'>>;
export type IUpsertLesson = ILesson;
