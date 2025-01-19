import { IClassroom, IsObjectId } from "@lingua/api";
import { Types } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsString, IsNotEmpty, IsInt, IsBoolean } from "class-validator";
import { User } from "./user.schema";

export type ClassroomDocument = Classroom & Document;

@Schema()
export class Classroom implements IClassroom  {
    @Prop()
    @IsNotEmpty()
    @IsObjectId()
    _id!: Types.ObjectId;
    
    @Prop()
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

export const ClassroomSchema = SchemaFactory.createForClass(User);