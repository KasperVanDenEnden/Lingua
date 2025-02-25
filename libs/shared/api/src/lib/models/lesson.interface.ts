import { ICourse } from './course.interface';
import { Id } from './id';
import { IRoom } from './room.interface';
import { IUser } from './user.interface';

export interface ILesson {
  id?: Id;
  _id: Id;

  course: Id | ICourse;

  room: Id | IRoom; // Room Id
  teacher: Id | IUser; // Teacher Id
  students: Id[] | IUser[]; // Attending students

  title: string;
  description: string;

  day: Date; // Alleen de datum (YYYY-MM-DD)
  startTime: Date; // Inclusief tijd
  endTime: Date; // Inclusief tijd
}

export type ICreateLesson = Pick<
  ILesson,
  'course' | 'room' | 'teacher' | 'day' | 'startTime' | 'endTime'
>;
export type IUpdateLesson = Partial<Omit<ILesson, 'id'>>;
export type IUpsertLesson = ILesson;
