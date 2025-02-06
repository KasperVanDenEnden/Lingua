import { ICreateLocation, IsObjectId, Province } from '@lingua/api';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLocationDto implements ICreateLocation {
  @IsNotEmpty()
  @IsString()
  number!: string;

  @IsNotEmpty()
  @IsObjectId()
  createdBy!: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  street!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  postal!: string;

  @IsNotEmpty()
  @IsEnum(Province, { message: 'Province must be a valid enum value' })
  province!: Province;
}
