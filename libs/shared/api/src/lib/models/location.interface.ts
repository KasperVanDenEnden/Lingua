import { Id } from './id';
import { IUser } from './user.interface';

export enum Province {
  Drenthe = 'Drenthe',
  Flevoland = 'Flevoland',
  Friesland = 'Friesland',
  Gelderland = 'Gelderland',
  Groningen = 'Groningen',
  Limburg = 'Limburg',
  NoordBrabant = 'Noord-Brabant',
  NoordHolland = 'Noord-Holland',
  Overijssel = 'Overijssel',
  Utrecht = 'Utrecht',
  Zeeland = 'Zeeland',
  ZuidHolland = 'Zuid-Holland',
}

export interface ILocation {
  id?: Id;
  _id: Id;

  createdBy: Id | IUser; // Id from admin

  slug: string;
  floors:number;
  rooms:number;

  street: string;
  number: string;
  city: string;
  postal: string;
  province: Province;
}

export type ICreateLocation = Pick<
  ILocation,
  'slug' | 'createdBy' | 'street' | 'number' | 'city' | 'postal' | 'province' | 'floors' | 'rooms'
>;
export type IUpdateLocation = Partial<Omit<ILocation, 'id'>>;
export type IUpsertLocation = ILocation;
