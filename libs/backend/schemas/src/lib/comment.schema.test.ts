import { MongoMemoryServer } from 'mongodb-memory-server';
import { Comment, CommentSchema } from './comment.schema';
import { disconnect, Model, Types } from 'mongoose';
import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { validate } from 'class-validator';

describe('CommentSchema Tests', () => {
  let mongod: MongoMemoryServer;
  let commentModel: Model<Comment>;
  let baseBody: Partial<Comment>;

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
            name: Comment.name,
            schema: CommentSchema,
          },
        ]),
      ],
    }).compile();

    commentModel = app.get<Model<Comment>>(getModelToken(Comment.name));
    await commentModel.ensureIndexes();
  });

  beforeEach(() => {
    baseBody = {
      id: new Types.ObjectId(),
      student: new Types.ObjectId(),
      class: new Types.ObjectId(),
      comment: 'Test comment',
      rating: 0,
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    await disconnect();
    await mongod.stop();
  });

  it('should pass validation with valid data', async () => {
    const body = { ...baseBody };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBe(0);
  });

  it('should fail validation if student is missing', async () => {
    const body = { ...baseBody, student: undefined };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('student');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'student should not be empty'
    );
  });
  it('should fail validation if class is missing', async () => {
    const body = { ...baseBody, class: undefined };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('class');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'class should not be empty'
    );
  });
  it('should fail validation if comment is missing', async () => {
    const body = { ...baseBody, comment: undefined };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('comment');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'comment should not be empty'
    );
  });
  it('should fail validation if rating is missing', async () => {
    const body = { ...baseBody, rating: undefined };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('rating');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'rating should not be empty'
    );
  });
  it('should fail validation if createdAt is missing', async () => {
    const body = { ...baseBody, createdAt: undefined };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('createdAt');
    expect(errors[0].constraints?.['isNotEmpty']).toBe(
      'createdAt should not be empty'
    );
  });

  it('should fail validation if student is invalid type', async () => {
    const body = { ...baseBody, student: 'invalid' };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('student');

    expect(errors[0].constraints?.['isObjectId']).toBe(
      'student must be a valid ObjectId'
    );
  });
  it('should fail validation if class is invalid type', async () => {
    const body = { ...baseBody, class: 'invalid' };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('class');

    expect(errors[0].constraints?.['isObjectId']).toBe(
      'class must be a valid ObjectId'
    );
  });
  it('should fail validation if comment is invalid type', async () => {
    const body = { ...baseBody, comment: 0 };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('comment');

    expect(errors[0].constraints?.['isString']).toBe(
      'comment must be a string'
    );
  });
  it('should fail validation if rating is invalid type', async () => {
    const body = { ...baseBody, rating: 'invalid' };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('rating');

    expect(errors[0].constraints?.['isInt']).toBe(
      'rating must be an integer number'
    );
  });
  it('should fail validation if createdAt is invalid type', async () => {
    const body = { ...baseBody, createdAt: 'invalid' };

    const plain = plainToInstance(Comment, body);
    const errors = await validate(plain);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('createdAt');

    expect(errors[0].constraints?.['isDate']).toBe(
      'createdAt must be a Date instance'
    );
  });
});
