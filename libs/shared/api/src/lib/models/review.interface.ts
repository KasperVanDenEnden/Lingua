import { Id } from './id';

export interface IReview {
  id: Id;

  student: Id; // user Id
  class: Id; // class Id

  comment: string;
  rating: number;
  createdAt: Date;
}

export type ICreateReview = Pick<
IReview,
  'student' | 'class' | 'comment' | 'rating'
>;
export type IUpdateReview = Partial<Omit<IReview, 'id'>>;
export type IUpsertReview = IReview;
