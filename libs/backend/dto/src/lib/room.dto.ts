import { ICreateRoom, IsObjectId, RoomStatus } from '@lingua/api';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoomDto implements ICreateRoom {
  @IsNotEmpty()
  @IsString()
  slug!: string;
  
  @IsNotEmpty()
  @IsEnum(RoomStatus, { message: 'Status must be a valid enum value' })
  status!: RoomStatus;

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
