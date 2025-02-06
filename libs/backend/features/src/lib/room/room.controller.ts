import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { BodyObjectIdsPipe, Id, IUpdateRoom, IRoom, stringObjectIdPipe, Role } from '@lingua/api';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';

@Controller('room')
@UseGuards(JwtAuthGuard)
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
  
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async create(@Body(BodyObjectIdsPipe) body: IRoom): Promise<IRoom> {
      Logger.log('create', this.TAG);
      return await this.roomService.create(body);
    }
  
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Put(':id')
    async update(
      @Param('id', stringObjectIdPipe) id: Id,
      @Body(BodyObjectIdsPipe) body: IUpdateRoom
    ): Promise<IRoom> {
      Logger.log('update', this.TAG);
      return await this.roomService.update(id, body);
    }
  
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id', stringObjectIdPipe) id: Id) {
      Logger.log('delete', this.TAG);
      return this.roomService.delete(id);
    }
}
