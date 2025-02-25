import { Types } from "mongoose";
import { CreateLessonDto } from "./lesson.dto";
import { validate } from "class-validator";

describe('LessonDto Tests', () => {
    let DTO: CreateLessonDto;

    beforeEach(() => {
        DTO = new CreateLessonDto
        DTO.course = new Types.ObjectId()
        DTO.teacher = new Types.ObjectId();
        DTO.room = new Types.ObjectId();
        DTO.students = [];
        DTO.day = new Date();
        DTO.startTime = new Date();
        DTO.endTime = new Date();
    })

    it('should pass validation with valid data', async () => {
        const errors = await validate(DTO);
        expect(errors.length).toBe(0);
    })

    it('should fail validation when course is missing', async () => {
        DTO.course = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('course');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('course should not be empty');
    })
  
    it('should fail validation when teacher is missing', async () => {
        DTO.teacher = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('teacher');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('teacher should not be empty');
    })
  
    it('should fail validation when room is missing', async () => {
        DTO.room = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('room');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('room should not be empty');
    })
  
    it('should fail validation when startTime is missing', async () => {
        DTO.startTime = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('startTime');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('startTime should not be empty');
    })
   
    it('should fail validation when endTime is missing', async () => {
        DTO.endTime = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('endTime');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('endTime should not be empty');
    })
  
    it('should fail validation when course is not valid type', async () => {
        DTO.course = 'invalid' as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('course');
        expect(errors[0].constraints?.["isObjectId"]).toBe('course must be a valid ObjectId');
    })
   
    it('should fail validation when teacher is not valid type', async () => {
        DTO.teacher = 'invalid' as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('teacher');
        expect(errors[0].constraints?.["isObjectId"]).toBe('teacher must be a valid ObjectId');
    })
  
    it('should fail validation when room is not valid type', async () => {
        DTO.room = 'invalid' as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('room');
        expect(errors[0].constraints?.["isObjectId"]).toBe('room must be a valid ObjectId');
    })

    it('should fail validation when startTime is not valid type', async () => {
        DTO.startTime = 'invalid' as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('startTime');
        expect(errors[0].constraints?.["isDate"]).toBe('startTime must be a Date instance');
    })
   
    it('should fail validation when endTime is not valid type', async () => {
        DTO.endTime = 'invalid' as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('endTime');
        expect(errors[0].constraints?.["isDate"]).toBe('endTime must be a Date instance');
    })

})