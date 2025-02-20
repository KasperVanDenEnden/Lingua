import { Id } from './id';
import { ILocation } from './location.interface';

export interface IRoom {
  id?: Id;
  _id: Id;

  location: Id | ILocation; // location Id

  slug: string;
  capacity: number;
  floor: number;

  hasMonitor: boolean;
}

export type ICreateRoom = Pick<
  IRoom,
  'location' | 'capacity' | 'floor' | 'hasMonitor'
>;
export type IUpdateRoom = Partial<Omit<IRoom, 'id'>>;
export type IUpsertRoom = IRoom;
