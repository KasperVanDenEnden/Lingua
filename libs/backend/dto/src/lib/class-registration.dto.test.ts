import { Types } from "mongoose";
import { validate } from "class-validator";
import { CreateClassRegistrationDto } from "./class-registration.dto";

describe('ClassDto Tests', () => {
    let DTO: CreateClassRegistrationDto;

    beforeEach(() => {
        DTO = new CreateClassRegistrationDto();
        DTO.class = new Types.ObjectId();
        DTO.student = new Types.ObjectId(); 
    });

    it('should pass validation with valid data', async () => {
        const errors = await validate(DTO);
        expect(errors.length).toBe(0);
    })

    it('should fail validation when class is missing', async () => {
        DTO.class = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('class');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('class should not be empty');
    })
    
    it('should fail validation when student is missing', async () => {
        DTO.student = undefined as any;
        const errors = await validate(DTO);
        
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('student');
        expect(errors[0].constraints?.["isNotEmpty"]).toBe('student should not be empty');
    })
    
    it('should fail validation when class is not valid type', async () => {
        DTO.class = 'invalid' as any;
        const errors = await validate(DTO);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('class');
        expect(errors[0].constraints?.["isObjectId"]).toBe('class must be a valid ObjectId');
    })

    it('should fail validation when capacity is not valid type', async () => {
        DTO.student = 'invalid' as any;
        const errors = await validate(DTO);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('student');
        expect(errors[0].constraints?.["isObjectId"]).toBe('student must be a valid ObjectId');
    })
})