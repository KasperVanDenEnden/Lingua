import { IClass } from '@lingua/api';
import { Class, ClassDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AssistantService {
    private TAG = 'AssistantService'

    constructor(@InjectModel(Class.name) private classModel:Model<ClassDocument>) {}

    async getAssistants() {
        Logger.log('getAssistants', this.TAG);
        
        const assistantRecords = await this.classModel.aggregate([
            // Unwind the assistants array
            { $unwind: '$assistants' },
            
            // Lookup to populate assistant details
            {
                $lookup: {
                    from: 'users', // Make sure this matches your users collection name
                    localField: 'assistants',
                    foreignField: '_id',
                    as: 'assistantDetails'
                }
            },

            // Lookup to populate full class details
            {
                $lookup: {
                    from: 'classes', // Ensure this matches your classes collection name
                    localField: '_id',
                    foreignField: '_id',
                    as: 'classDetails'
                }
            },
            
            // Unwind the assistantDetails and classdetails
            { $unwind: '$assistantDetails' },
            { $unwind: '$classDetails' },

            
            // Filter for teachers
            { $match: { 'assistantDetails.role': 'teacher' } },
            
            // Project the fields you want
            {
                $project: {
                    assistant: '$assistantDetails',
                    class: '$classDetails'
                }
            }
        ]);
    
        return assistantRecords;
    }
    
    async addAssistant(id: Types.ObjectId, classId: Types.ObjectId): Promise<IClass> {
        Logger.log('addAssistant', this.TAG);

        const updatedClass = await this.classModel.findByIdAndUpdate(
            {_id:classId},
            { 
                $push : {
                    assistants: id
                }
            },
            {
                new:true,
                runValidators: true
            }
        );

        if (!updatedClass) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);

        return updatedClass;
    }
    
    async removeAssistant(id: Types.ObjectId, classId: Types.ObjectId):  Promise<IClass> {
        Logger.log('removeAssistant', this.TAG);

        const updatedClass = await this.classModel.findByIdAndUpdate(
            {_id:classId},
            { 
                $pull : {
                    assistants: id
                }
            },
            {
                new:true,
                runValidators: true
            }
        ); 
        
        if (!updatedClass) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);

        return updatedClass;
    }
}
