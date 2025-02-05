import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ClassService } from './class.service';
import { IClass, stringObjectIdPipe, Id, BodyObjectIdsPipe, IUpdateClass } from '@lingua/api';

@Controller('class')
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

  @Post()
  async create(@Body(BodyObjectIdsPipe) body: IClass): Promise<IClass> {
    Logger.log('create', this.TAG);
    return await this.classService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', stringObjectIdPipe) id: Id,
    @Body(BodyObjectIdsPipe) body: IUpdateClass
  ): Promise<IClass> {
    Logger.log('update', this.TAG);
    return await this.classService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', stringObjectIdPipe) id: Id) {
    Logger.log('delete', this.TAG);
    return this.classService.delete(id);
  }
}
