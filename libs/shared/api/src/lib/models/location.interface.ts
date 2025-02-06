import { Id } from './id';

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
  id: Id;

  createdBy: Id; // Id from admin

  slug: string;

  street: string;
  number: string;
  city: string;
  postal: string;
  province: Province;
}

export type ICreateLocation = Pick<
  ILocation,
  'createdBy' | 'street' | 'number' | 'city' | 'postal' | 'province'
>;
export type IUpdateLocation = Partial<Omit<ILocation, 'id'>>;
export type IUpsertLocation = ILocation;
