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
import { ClassService } from './class.service';
import {
  IClass,
  stringObjectIdPipe,
  Id,
  BodyObjectIdsPipe,
  IUpdateClass,
  Role,
} from '@lingua/api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('class')
@UseGuards(JwtAuthGuard)
export class ClassController {
  private TAG = 'ClassController';
  constructor(private classService: ClassService) {}

  @Get()
  async getAll(): Promise<IClass[]> {
    Logger.log('getAll', this.TAG);
    return await this.classService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', stringObjectIdPipe) id: Id): Promise<IClass> {
    Logger.log('getAll', this.TAG);
    return await this.classService.getOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher, Role.Admin)
  @Post()
  async create(@Body(BodyObjectIdsPipe) body: IClass): Promise<IClass> {
    Logger.log('create', this.TAG);
    return await this.classService.create(body);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Teacher, Role.Admin)
  @Put(':id')
  async update(
    @Param('id', stringObjectIdPipe) id: Id,
    @Body(BodyObjectIdsPipe) body: IUpdateClass
  ): Promise<IClass> {
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
