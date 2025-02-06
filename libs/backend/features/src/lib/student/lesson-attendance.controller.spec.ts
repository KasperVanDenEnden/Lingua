import { Test, TestingModule } from '@nestjs/testing';
import { LessonAttendanceController } from './lesson-attendance.controller';

describe('LessonAttendanceController', () => {
  let controller: LessonAttendanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonAttendanceController],
    }).compile();

    controller = module.get<LessonAttendanceController>(
      LessonAttendanceController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
