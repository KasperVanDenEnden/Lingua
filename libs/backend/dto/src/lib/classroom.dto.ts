import { ICreateClassroom, IsObjectId } from "@lingua/api";
import { IsBoolean, IsInt, IsNotEmpty, Min } from "class-validator";
import { Types } from "mongoose";

export class CreateClassroomDto implements ICreateClassroom {
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