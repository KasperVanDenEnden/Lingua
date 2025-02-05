import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { BodyObjectIdsPipe, Id, ILesson, IUpdateLesson, stringObjectIdPipe } from '@lingua/api';

@Controller('lesson')
export class LessonController {
  private TAG = 'LessonController';
  constructor(private lessonService: LessonService) {}

  @Get()
  async getAll(): Promise<ILesson[]> {
    Logger.log('getAll', this.TAG);
    return await this.lessonService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', stringObjectIdPipe) id: Id): Promise<ILesson> {
    Logger.log('getAll', this.TAG);
    return await this.lessonService.getOne(id);
  }

  @Post()
  async create(@Body(BodyObjectIdsPipe) body: ILesson): Promise<ILesson> {
    Logger.log('create', this.TAG);
    return await this.lessonService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', stringObjectIdPipe) id: Id,
    @Body(BodyObjectIdsPipe) body: IUpdateLesson
  ): Promise<ILesson> {
    Logger.log('update', this.TAG);
    return await this.lessonService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', stringObjectIdPipe) id: Id) {
    Logger.log('delete', this.TAG);
    return this.lessonService.delete(id);
  }
}
