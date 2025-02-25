import { ICourse, IUpdateCourseAssistant } from '@lingua/api';
import { Course, CourseDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AssistantService {
  private TAG = 'AssistantService';

  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>
  ) {}

  async getAssistants() {
    Logger.log('getAssistants', this.TAG);

    const assistantRecords = await this.courseModel.aggregate([
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

      // Lookup to populate full course details
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'courseDetails',
        },
      },

      // Unwind the assistantDetails and coursedetails
      { $unwind: '$assistantDetails' },
      { $unwind: '$courseDetails' },

      // Filter for teachers
      { $match: { 'assistantDetails.role': 'teacher' } },

      // Project the fields you want
      {
        $project: {
          assistant: '$assistantDetails',
          course: '$courseDetails',
        },
      },
    ]);

    return assistantRecords;
  }

  async addAssistant(
    body :IUpdateCourseAssistant
  ): Promise<ICourse> {
    Logger.log('addAssistant', this.TAG);
    const courseId = body.course;
    const assistantId = body.assistant;

    Logger.log(typeof courseId, typeof assistantId, 'Types')
    
    const existingCourse = await this.courseModel.findOne({
      _id: courseId,
      assistants: assistantId,
    });

    if (existingCourse)
      throw new HttpException(
        'Assistant already in course',
        HttpStatus.BAD_REQUEST
      );

    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      courseId,
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
    const courseId = body.course;
    const assistantId = body.assistant;

    const existingCourse = await this.courseModel.findOne({
      _id: courseId,
      assistants: assistantId,
    });

    if (!existingCourse)
      throw new HttpException(
        'Assistant not found in course',
        HttpStatus.NOT_FOUND
      );

    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      courseId,
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
