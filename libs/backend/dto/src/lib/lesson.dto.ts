import { ICreateLesson, Id, IsObjectId } from "@lingua/api";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateLessonDto implements ICreateLesson {
    @IsNotEmpty()
    @IsObjectId()
    class!: Id;

    @IsNotEmpty()
    @IsObjectId()
    room!: Id;

    @IsNotEmpty()
    @IsObjectId()
    teacher!: Id;
    
    
    @IsNotEmpty()
    @IsDate()
    startTime!: Date;
    
    @IsNotEmpty()
    @IsDate()
    endTime!: Date;
}