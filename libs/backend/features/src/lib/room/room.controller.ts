import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { BodyObjectIdsPipe, Id, IUpdateRoom, IRoom, stringObjectIdPipe } from '@lingua/api';

@Controller('room')
export class RoomController {
    private TAG = 'RoomController';
    constructor(private roomService: RoomService) {}
  
    @Get()
    async getAll(): Promise<IRoom[]> {
        Logger.log('getAll', this.TAG);
      return await this.roomService.getAll();
    }
  
    @Get(':id')
    async getOne(@Param('id', stringObjectIdPipe) id: Id): Promise<IRoom> {
      Logger.log('getAll', this.TAG);
      return await this.roomService.getOne(id);
    }
  
    @Post()
    async create(@Body(BodyObjectIdsPipe) body: IRoom): Promise<IRoom> {
      Logger.log('create', this.TAG);
      return await this.roomService.create(body);
    }
  
    @Put(':id')
    async update(
      @Param('id', stringObjectIdPipe) id: Id,
      @Body(BodyObjectIdsPipe) body: IUpdateRoom
    ): Promise<IRoom> {
      Logger.log('update', this.TAG);
      return await this.roomService.update(id, body);
    }
  
    @Delete(':id')
    async delete(@Param('id', stringObjectIdPipe) id: Id) {
      Logger.log('delete', this.TAG);
      return this.roomService.delete(id);
    }
}
