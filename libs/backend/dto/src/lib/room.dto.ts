import { ICreateRoom, IsObjectId } from '@lingua/api';
import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoomDto implements ICreateRoom {
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @IsNotEmpty()
  @IsObjectId()
  location!: Types.ObjectId;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  capacity!: number;

  @IsNotEmpty()
  @IsInt()
  floor!: number;

  @IsNotEmpty()
  @IsBoolean()
  hasMonitor!: boolean;
}
