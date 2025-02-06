import { Test, TestingModule } from '@nestjs/testing';
import { LessonAttendanceService } from './lesson-attendance.service';

describe('LessonAttendanceService', () => {
  let service: LessonAttendanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonAttendanceService],
    }).compile();

    service = module.get<LessonAttendanceService>(LessonAttendanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
