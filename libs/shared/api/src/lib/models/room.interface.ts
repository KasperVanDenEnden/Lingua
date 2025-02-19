import { Id } from './id';

export interface IRoom {
  id?: Id;
  _id: Id;

  location: Id; // location Id

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
