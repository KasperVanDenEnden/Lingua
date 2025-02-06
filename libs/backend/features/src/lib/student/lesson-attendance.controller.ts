import { Controller, Logger, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { Id, ILesson, Role, stringObjectIdPipe } from '@lingua/api';
import { LessonAttendanceService } from './lesson-attendance.service';

@Controller('lesson-attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Student, Role.Admin)
export class LessonAttendanceController {
  private TAG = 'LessonAttendanceController';

  constructor(private lessonAttendanceService: LessonAttendanceService) {}

  @Put(':id/subscribe/:studentId')
  async subscribe(
    @Param('id', stringObjectIdPipe) id: Id,
    @Param('studentId', stringObjectIdPipe) studentId: Id
  ): Promise<ILesson> {
    Logger.log('subscribe', this.TAG);

    return this.lessonAttendanceService.subscribe(id, studentId);
  }

  @Put(':id/unsubscribe/:studentId')
  async unsubscribe(
    @Param('id', stringObjectIdPipe) id: Id,
    @Param('studentId', stringObjectIdPipe) studentId: Id
  ): Promise<ILesson> {
    Logger.log('unsubscribe', this.TAG);

    return this.lessonAttendanceService.unsubscribe(id, studentId);
  }
}