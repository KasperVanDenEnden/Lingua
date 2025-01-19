import { IComment } from "@lingua/api";
import { Types } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { IsMongoId, IsString, IsNotEmpty, IsDate, IsInt } from "class-validator";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment implements IComment {
    @Prop()
    @IsNotEmpty()
    @IsMongoId()
    _id!: Types.ObjectId;
    
    @Prop()
    @IsNotEmpty()
    @IsMongoId()
    student!: Types.ObjectId;
    
    @Prop()
    @IsNotEmpty()
    @IsMongoId()
    class!: Types.ObjectId;
    
    @Prop()
    @IsNotEmpty()
    @IsString()
    comment!: string;
    
    @Prop()
    @IsNotEmpty()
    @IsInt()
    rating!: number;
    
    @Prop()
    @IsNotEmpty()
    @IsDate()
    createdAt!: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);