import { IRoom, IsObjectId } from '@lingua/api';
import { Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsInt, IsBoolean } from 'class-validator';

export type RoomDocument = Room & Document;

@Schema()
export class Room implements IRoom {
  @Prop()
  @IsNotEmpty()
  @IsObjectId()
  id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  @IsNotEmpty()
  @IsObjectId()
  location!: Types.ObjectId;

  @Prop()
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @Prop()
  @IsNotEmpty()
  @IsInt()
  capacity!: number;

  @Prop()
  @IsNotEmpty()
  @IsInt()
  floor!: number;

  @Prop()
  @IsNotEmpty()
  @IsBoolean()
  hasMonitor!: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
