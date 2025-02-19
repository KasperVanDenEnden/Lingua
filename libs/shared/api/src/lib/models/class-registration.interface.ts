import { Id } from './id';

export interface IClassRegistration {
  id?: Id;
  _id: Id;
  
  class: Id;
  student: Id;
  registeredAt: Date;
  unregisteredAt: Date;
}

export type ICreateClassRegistration = Pick<
  IClassRegistration,
  'class' | 'student'
>;
export type IUpdateClassRegistration = Partial<Omit<IClassRegistration, 'id'>>;
export type IUpsertClassRegistration = IClassRegistration;