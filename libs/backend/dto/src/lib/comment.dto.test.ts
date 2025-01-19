import { Types } from "mongoose"
import { CreateCommentDto } from "./comment.dto"
import { validate } from "class-validator"

describe('CommentDto Tests', () => {
    let DTO: CreateCommentDto

    beforeEach(() => {
        DTO = new CreateCommentDto
        DTO.student = new Types.ObjectId
        DTO.class = new Types.ObjectId
        DTO.comment = 'Comment'
        DTO.rating = 1
    })

    it('should pass validation with valid data', async () => {
        const errors = await validate(DTO);
        expect(errors.length).toBe(0);
    })   

    it('should fail validation when student is missing', async () => {
        DTO.student = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('student');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('student should not be empty');
    })
    
    it('should fail validation when class is missing', async () => {
        DTO.class = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('class');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('class should not be empty');
    })

    it('should fail validation when comment is missing', async () => {
        DTO.comment = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('comment');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('comment should not be empty');
    })

    it('should fail validation when rating is missing', async () => {
        DTO.rating = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('rating');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('rating should not be empty');
    })

    it('should fail validation when student is not valid type', async () => {
        DTO.student = 'invalid' as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('student');
        expect(errors[0].constraints?.["isObjectId"]).toBe('student must be a valid ObjectId');
    })
    
    it('should fail validation when class is not valid type', async () => {
        DTO.class = 'invalid' as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('class');
        expect(errors[0].constraints?.["isObjectId"]).toBe('class must be a valid ObjectId');
    })

    it('should fail validation when comment is not valid type', async () => {
        DTO.comment = 0 as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('comment');
        expect(errors[0].constraints?.["isString"]).toBe('comment must be a string');
    })
    it('should fail validation when rating is not valid type', async () => {
        DTO.rating = 'invalid' as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('rating');
        expect(errors[0].constraints?.["isInt"]).toBe('rating must be an integer number');
    })

    it('should fail validation when rating is below 0', async () => {
        DTO.rating = -1 as any;
        const errors = await validate(DTO);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('rating');
        expect(errors[0].constraints?.["min"]).toBe('rating must not be less than 0');
    })

    it('should fail validation when rating is above 5', async () => {
        DTO.rating = 6 as any;
        const errors = await validate(DTO);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('rating');
        expect(errors[0].constraints?.["max"]).toBe('rating must not be greater than 5');
    })
})