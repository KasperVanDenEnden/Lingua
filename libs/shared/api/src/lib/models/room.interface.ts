import { Id } from './id';
import { ILocation } from './location.interface';

export enum RoomStatus {
  Available = 'Available',
  Unavailable = 'Unavailable',
}

export interface IRoom {
  id?: Id;
  _id: Id;

  location: Id | ILocation; // location Id

  slug: string;
  status: RoomStatus;

  capacity: number;
  floor: number;

  hasMonitor: boolean;
}

export type ICreateRoom = Pick<
  IRoom,
  'slug' | 'location' | 'capacity' | 'floor' | 'hasMonitor' | 'status'
>;
export type IUpdateRoom = Partial<Omit<IRoom, 'id'>>;
export type IUpsertRoom = IRoom;
