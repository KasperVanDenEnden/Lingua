import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import {
  ICourse,
  stringObjectIdPipe,
  Id,
  BodyObjectIdsPipe,
  IUpdateCourse,
  Role,
} from '@lingua/api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('course')
@UseGuards(JwtAuthGuard)
export class CourseController {
  private TAG = 'CourseController';
  constructor(private classService: CourseService) {}

  @Get()
  async getAll(): Promise<ICourse[]> {
    Logger.log('getAll', this.TAG);
    return await this.classService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', stringObjectIdPipe) id: Id): Promise<ICourse> {
    Logger.log('getAll', this.TAG);
    return await this.classService.getOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher, Role.Admin)
  @Post()
  async create(@Body(BodyObjectIdsPipe) body: ICourse): Promise<ICourse> {
    Logger.log('create', this.TAG);
    return await this.classService.create(body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher, Role.Admin)
  @Put(':id')
  async update(
    @Param('id', stringObjectIdPipe) id: Id,
    @Body(BodyObjectIdsPipe) body: IUpdateCourse
  ): Promise<ICourse> {
    Logger.log('update', this.TAG);
    return await this.classService.update(id, body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher, Role.Admin)
  @Delete(':id')
  async delete(@Param('id', stringObjectIdPipe) id: Id) {
    Logger.log('delete', this.TAG);
    return this.classService.delete(id);
  }
}
