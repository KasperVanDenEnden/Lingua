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
import { ReviewService } from './review.service';
import {
  BodyObjectIdsPipe,
  IReview,
  Id,
  IUpdateReview,
  stringObjectIdPipe,
} from '@lingua/api';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('review')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  private TAG = 'ReviewController';
  constructor(private reviewService: ReviewService) {}

  // @Get()
  // async getAll(): Promise<IReview[]> {
  //     Logger.log('getAll', this.TAG);
  //   return await this.reviewService.getAll();
  // }

  // @Get(':id')
  // async getOne(@Param('id', stringObjectIdPipe) id: Id): Promise<IReview> {
  //   Logger.log('getAll', this.TAG);
  //   return await this.reviewService.getOne(id);
  // }

  @Post()
  async create(@Body(BodyObjectIdsPipe) body: IReview): Promise<IReview> {
    Logger.log('create', this.TAG);
    return await this.reviewService.create(body);
  }

  // @Put(':id')
  // async update(
  //   @Param('id', stringObjectIdPipe) id: Id,
  //   @Body(BodyObjectIdsPipe) body: IUpdateComment
  // ): Promise<IReview> {
  //   Logger.log('update', this.TAG);
  //   return await this.reviewService.update(id, body);
  // }

  @Delete(':id/:classId')
  async delete(
    @Param('id', stringObjectIdPipe) id: Id,
    @Param('classId', stringObjectIdPipe) classId: Id
  ) {
    Logger.log('delete', this.TAG);
    return this.reviewService.delete(id, classId);
  }
}