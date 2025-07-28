import { z } from 'zod';


export const doctorSignupSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['DOCTOR', 'PATIENT', 'MEDICAL']),
    licenseNumber: z.string().min(1, 'License number is required'),
    specialization: z.string().min(1, 'Specialization is required'),
    age: z.number().min(18, 'You must be at least 18 years old'),
})