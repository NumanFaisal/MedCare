import { z } from "zod";

export const patientSignupSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['PATIENT', 'DOCTOR', 'MEDICAL']),
    
});

// Export the inferred type
export type PatientSignupType = z.infer<typeof patientSignupSchema>;
