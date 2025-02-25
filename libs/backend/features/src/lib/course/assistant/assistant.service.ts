import { ICourse, IUpdateCourseAssistant } from '@lingua/api';
import { Course, CourseDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AssistantService {
  private TAG = 'AssistantService';

  constructor(
    @InjectModel(Course.name) private classModel: Model<CourseDocument>
  ) {}

  async getAssistants() {
    Logger.log('getAssistants', this.TAG);

    const assistantRecords = await this.classModel.aggregate([
      // Unwind the assistants array
      { $unwind: '$assistants' },

      // Lookup to populate assistant details
      {
        $lookup: {
          from: 'users',
          localField: 'assistants',
          foreignField: '_id',
          as: 'assistantDetails',
        },
      },

      // Lookup to populate full class details
      {
        $lookup: {
          from: 'classes',
          localField: '_id',
          foreignField: '_id',
          as: 'classDetails',
        },
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
          class: '$classDetails',
        },
      },
    ]);

    return assistantRecords;
  }

  async addAssistant(
    body :IUpdateCourseAssistant
  ): Promise<ICourse> {
    Logger.log('addAssistant', this.TAG);
    const classId = body.class;
    const assistantId = body.assistant;

    Logger.log(typeof classId, typeof assistantId, 'Types')
    
    const existingCourse = await this.classModel.findOne({
      _id: classId,
      assistants: assistantId,
    });

    if (existingCourse)
      throw new HttpException(
        'Assistant already in class',
        HttpStatus.BAD_REQUEST
      );

    const updatedCourse = await this.classModel.findByIdAndUpdate(
      classId,
      {
        $push: {
          assistants: assistantId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse)
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);

    return updatedCourse;
  }

  async removeAssistant(
    body:IUpdateCourseAssistant
  ): Promise<ICourse> {
    Logger.log('removeAssistant', this.TAG);
    const classId = body.class;
    const assistantId = body.assistant;

    const existingCourse = await this.classModel.findOne({
      _id: classId,
      assistants: assistantId,
    });

    if (!existingCourse)
      throw new HttpException(
        'Assistant not found in class',
        HttpStatus.NOT_FOUND
      );

    const updatedCourse = await this.classModel.findByIdAndUpdate(
      classId,
      {
        $pull: {
          assistants: assistantId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse)
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);

    return updatedCourse;
  }
}
