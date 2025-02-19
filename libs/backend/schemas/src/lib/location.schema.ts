import { ILocation, IsObjectId, Province } from '@lingua/api';
import { Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export type LocationDocument = Location & Document;

@Schema()
export class Location implements ILocation {
  @Prop({ default: () => new Types.ObjectId() })
  @IsNotEmpty()
  @IsObjectId()
  _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @IsNotEmpty()
  @IsObjectId()
  createdBy!: Types.ObjectId;

  @Prop()
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  street!: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  number!: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  city!: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  postal!: string;

  @Prop({ type: String, enum: Object.values(Province) })
  @IsNotEmpty()
  @IsEnum(Province, { message: 'Province must be a valid enum value' })
  province!: Province;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
