import { z } from "zod"

// Define the sign-up schema using Zod
export const signupSchema = z.object({
    firstName: z.string().min(1, 'Name is required'),
    lastName: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['PATIENT', 'DOCTOR', 'MEDICAL']),
    patientId: z.string().optional(), // Will be auto-generated for user
    age: z.number().min(0, 'Age must be a positive number').optional(),
    qualifications: z.string().optional(),
    experiences: z.string().optional(),
    licenseNumber: z.string().optional(),
    specialization: z.string().optional(),
    description: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(), // Only for Medical type
    shopName: z.string().optional(), // Only for Medical type
});