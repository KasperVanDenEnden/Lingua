import { ICourse } from './course.interface';
import { Id } from './id';
import { IUser } from './user.interface';

export interface IReview {
  id?: Id;
  _id: Id;

  student: Id | IUser; 
  course: Id | ICourse;

  comment: string;
  rating: number;
  createdAt: Date;
}

export type ICreateReview = Pick<
IReview,
  'student' | 'course' | 'comment' | 'rating'
>;
export type IUpdateReview = Partial<Omit<IReview, 'id'>>;
export type IUpsertReview = IReview;
