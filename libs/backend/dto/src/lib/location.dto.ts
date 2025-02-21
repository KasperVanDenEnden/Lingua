import { ICreateLocation, IsObjectId, Province } from '@lingua/api';
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLocationDto implements ICreateLocation {
  
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  floors!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  rooms!: number;

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
