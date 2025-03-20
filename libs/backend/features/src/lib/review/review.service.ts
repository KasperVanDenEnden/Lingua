import { IReview, Id } from '@lingua/api';
import { Course, CourseDocument } from '@lingua/schemas';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReviewService {
  private TAG = 'ReviewService';
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>
  ) {}

  //   async getAll(): Promise<IReview[]> {
  //     Logger.log('getAll', this.TAG);
  //     return await this.courseModel.find();
  //   }

  //   async getOne(id: Id): Promise<IReview> {
  //     Logger.log('getOne', this.TAG);

  //     const classInstance = await this.classModel.findById(id).exec();

  //     if (!classInstance) throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);

  //     return ;
  //   }

  async create(body: IReview): Promise<IReview> {
    Logger.log('create', this.TAG);

    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      { _id: new Types.ObjectId(body.course as Id) },
      {
        $push: {
          comments: body,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse)
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);

    return body;
  }

  //   async update(id: Id, changes: IUpdateComment): Promise<IReview> {
  //     Logger.log('update', this.TAG);

  //     const updatedComment = await this.courseModel.findByIdAndUpdate(
  //       id,
  //       changes,
  //       { new: true }
  //     );

  //     if (!updatedComment)
  //       throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);

  //     return updatedComment;
  //   }

  async delete(id: Id, classId: Id) {
    Logger.log('delete', this.TAG);

    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      classId,
      {
        $pull: {
          comments: { _id: id },
        },
      },
      {
        new: true, // Return the updated document
        runValidators: true,
      }
    );

    if (!updatedCourse)
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);

    return;
  }
}
