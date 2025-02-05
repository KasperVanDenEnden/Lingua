import { MongoMemoryServer } from 'mongodb-memory-server';
import { Lesson, LessonSchema } from './lesson.schema';
import { disconnect, Model, Types } from 'mongoose';
import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { validate } from 'class-validator';

describe('LessonSchema Tests', () => {
  let mongod: MongoMemoryServer;
  let lessonModel: Model<Lesson>;
  let baseBody: Partial<Lesson>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            return { uri };
          },
        }),
        MongooseModule.forFeature([
          {
            name: Lesson.name,
            schema: LessonSchema,
          },
        ]),
      ],
    }).compile();

    lessonModel = app.get<Model<Lesson>>(getModelToken(Lesson.name));
    await lessonModel.ensureIndexes();
  });

  beforeEach(() => {
    baseBody = {
      id: new Types.ObjectId(),
      class: new Types.ObjectId(),
      room: new Types.ObjectId(),
      teacher: new Types.ObjectId(),
      title: 'Test title',
      description: 'Test description',
      startTime: new Date(),
      endTime: new Date(),
    };
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('should pass validation with valid data', async () => {
    const body = { ...baseBody };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBe(0);
  });

  it('should fail validation if class is missing', async () => {
    const body = { ...baseBody, class: undefined };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('class');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'class should not be empty'
    );
  });
  it('should fail validation if room is missing', async () => {
    const body = { ...baseBody, room: undefined };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('room');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'room should not be empty'
    );
  });
  it('should fail validation if teacher is missing', async () => {
    const body = { ...baseBody, teacher: undefined };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('teacher');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'teacher should not be empty'
    );
  });
  it('should fail validation if title is missing', async () => {
    const body = { ...baseBody, title: undefined };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('title');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'title should not be empty'
    );
  });
  it('should fail validation if description is missing', async () => {
    const body = { ...baseBody, description: undefined };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('description');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'description should not be empty'
    );
  });
  it('should fail validation if startTime is missing', async () => {
    const body = { ...baseBody, startTime: undefined };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('startTime');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'startTime should not be empty'
    );
  });
  it('should fail validation if endTime is missing', async () => {
    const body = { ...baseBody, endTime: undefined };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('endTime');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'endTime should not be empty'
    );
  });

  it('should fail validation if class is invalid type', async () => {
    const body = { ...baseBody, class: 'invalid' };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('class');

    expect(errors[0].constraints?.['isObjectId']).toBe(
      'class must be a valid ObjectId'
    );
  });
  it('should fail validation if room is invalid type', async () => {
    const body = { ...baseBody, room: 'invalid' };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('room');

    expect(errors[0].constraints?.['isObjectId']).toBe(
      'room must be a valid ObjectId'
    );
  });
  it('should fail validation if teacher is invalid type', async () => {
    const body = { ...baseBody, teacher: 'invalid' };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('teacher');

    expect(errors[0].constraints?.['isObjectId']).toBe(
      'teacher must be a valid ObjectId'
    );
  });
  it('should fail validation if title is invalid type', async () => {
    const body = { ...baseBody, title: 0 };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('title');

    expect(errors[0].constraints?.['isString']).toBe('title must be a string');
  });
  it('should fail validation if description is invalid type', async () => {
    const body = { ...baseBody, description: 0 };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('description');

    expect(errors[0].constraints?.['isString']).toBe(
      'description must be a string'
    );
  });
  it('should fail validation if startTime is invalid type', async () => {
    const body = { ...baseBody, startTime: 'invalid' };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('startTime');

    expect(errors[0].constraints?.['isDate']).toBe(
      'startTime must be a Date instance'
    );
  });
  it('should fail validation if endTime is invalid type', async () => {
    const body = { ...baseBody, endTime: 'invalid' };

    const plain = plainToInstance(Lesson, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('endTime');

    expect(errors[0].constraints?.['isDate']).toBe(
      'endTime must be a Date instance'
    );
  });
});
