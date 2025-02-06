import { ICreateClass, IsObjectId, Language } from '@lingua/api';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Id } from '@lingua/api';

export class CreateClassDto implements ICreateClass {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(Language, { message: 'Language must be a valid enum value' })
  @IsNotEmpty()
  language!: Language;

  @IsNotEmpty({ message: 'TeacherId us required' })
  @IsObjectId()
  teacher!: Id;

  @IsArray()
  @ArrayMinSize(0, { message: 'Assistants must be an array (can be empty)' })
  @IsObjectId({
    each: true,
    message: 'Each asstisant must be a valid ObjectId',
  })
  assistants!: Id[];
}
