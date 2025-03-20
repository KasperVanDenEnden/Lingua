import { Id } from './id';

export interface ICourseRegistration {
  id?: Id;
  _id: Id;
  
  course: Id;
  student: Id;
  registeredAt: Date;
  unregisteredAt: Date;
}

export type ICreateCourseRegistration = Pick<
ICourseRegistration,
  'course' | 'student'
>;
export type IUpdateCourseRegistration = Partial<Omit<ICourseRegistration, 'id'>>;
export type IUpsertCourseRegistration = ICourseRegistration;