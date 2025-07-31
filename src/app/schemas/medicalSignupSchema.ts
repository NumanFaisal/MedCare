import { z } from "zod";

export const medicalSignupSchema = z.object({
    shopName: z.string().min(1, 'Shop name is required'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(1, 'Address is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits long'),
    role: z.enum(['DOCTOR', 'PATIENT', 'MEDICAL']),
})