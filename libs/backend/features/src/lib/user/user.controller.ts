import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { BodyObjectIdsPipe, Id, IUpdateUser, IUser, stringObjectIdPipe } from '@lingua/api';

@Controller('user')
export class UserController {
  private TAG = 'UserController';
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<IUser[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', stringObjectIdPipe) id: Id): Promise<IUser> {
    Logger.log('getAll', this.TAG);
    return await this.userService.getOne(id);
  }

  @Post()
  async create(@Body() body: IUser): Promise<IUser> {
    Logger.log('create', this.TAG);
    return await this.userService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', stringObjectIdPipe) id: Id,
    @Body(BodyObjectIdsPipe) body: IUpdateUser
  ): Promise<IUser> {
    Logger.log('update', this.TAG);
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', stringObjectIdPipe) id: Id) {
    Logger.log('delete', this.TAG);
    console.log(id);
    return this.userService.delete(id);
  }
}
