import { ILesson } from "@lingua/api";
import { Types } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId, IsString, IsNotEmpty, IsDate } from "class-validator";

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson implements ILesson {
    @Prop()
    @IsNotEmpty()
    @IsMongoId()
    class!: Types.ObjectId;

    @Prop()
    @IsNotEmpty()
    @IsMongoId()
    classroom!: Types.ObjectId;

    @Prop()
    @IsNotEmpty()
    @IsMongoId()
    teacher!: Types.ObjectId;

    @Prop()
    @IsNotEmpty()
    @IsString()
    title!: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    description!: string;

    @Prop()
    @IsNotEmpty()
    @IsDate()
    startTime!: Date;

    @Prop()
    @IsNotEmpty()
    @IsDate()
    endTime!: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);