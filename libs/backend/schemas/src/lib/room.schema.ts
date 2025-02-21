import { IRoom, IsObjectId, RoomStatus } from '@lingua/api';
import { Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsInt, IsBoolean, IsEnum } from 'class-validator';

export type RoomDocument = Room & Document;

@Schema()
export class Room implements IRoom {
  @Prop({ default: () => new Types.ObjectId() })
  @IsNotEmpty()
  @IsObjectId()
  _id!: Types.ObjectId;
  
  @Prop({ type: String, enum: Object.values(RoomStatus) })
  @IsNotEmpty()
  @IsEnum(RoomStatus, { message: 'Status must be a valid enum value' })
  status!: RoomStatus;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  @IsNotEmpty()
  @IsObjectId()
  location!: Types.ObjectId;

  @Prop({ unique: true })
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
