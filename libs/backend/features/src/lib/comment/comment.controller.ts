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
import { CommentService } from './comment.service';
import {
  BodyObjectIdsPipe,
  IComment,
  Id,
  IUpdateComment,
  stringObjectIdPipe,
} from '@lingua/api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comment')
@UseGuards(JwtAuthGuard)
export class CommentController {
  private TAG = 'CommentController';
  constructor(private commentService: CommentService) {}

  // @Get()
  // async getAll(): Promise<IComment[]> {
  //     Logger.log('getAll', this.TAG);
  //   return await this.commentService.getAll();
  // }

  // @Get(':id')
  // async getOne(@Param('id', stringObjectIdPipe) id: Id): Promise<IComment> {
  //   Logger.log('getAll', this.TAG);
  //   return await this.commentService.getOne(id);
  // }

  @Post()
  async create(@Body(BodyObjectIdsPipe) body: IComment): Promise<IComment> {
    Logger.log('create', this.TAG);
    return await this.commentService.create(body);
  }

  // @Put(':id')
  // async update(
  //   @Param('id', stringObjectIdPipe) id: Id,
  //   @Body(BodyObjectIdsPipe) body: IUpdateComment
  // ): Promise<IComment> {
  //   Logger.log('update', this.TAG);
  //   return await this.commentService.update(id, body);
  // }

  @Delete(':id/:classId')
  async delete(
    @Param('id', stringObjectIdPipe) id: Id,
    @Param('classId', stringObjectIdPipe) classId: Id
  ) {
    Logger.log('delete', this.TAG);
    return this.commentService.delete(id, classId);
  }
}