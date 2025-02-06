import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { BodyObjectIdsPipe, Id, ILesson, IUpdateLesson, Role, stringObjectIdPipe } from '@lingua/api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { RolesGuard } from '../auth/guards/role-auth.guard';

@Controller('lesson')
@UseGuards(JwtAuthGuard)
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

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher, Role.Admin)
  @Post()
  async create(@Body(BodyObjectIdsPipe) body: ILesson): Promise<ILesson> {
    Logger.log('create', this.TAG);
    return await this.lessonService.create(body);
  }
  
  @UseGuards(RolesGuard)
  @Roles(Role.Teacher, Role.Admin)
  @Put(':id')
  async update(
    @Param('id', stringObjectIdPipe) id: Id,
    @Body(BodyObjectIdsPipe) body: IUpdateLesson
  ): Promise<ILesson> {
    Logger.log('update', this.TAG);
    return await this.lessonService.update(id, body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher, Role.Admin)
  @Delete(':id')
  async delete(@Param('id', stringObjectIdPipe) id: Id) {
    Logger.log('delete', this.TAG);
    return this.lessonService.delete(id);
  }
}
