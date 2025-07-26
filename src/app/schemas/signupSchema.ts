import { z } from "zod";


export const signupSchema = z.discriminatedUnion("role", [
  // PATIENT schema (already added)
    z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        role: z.literal("PATIENT"),
    }),

    // ✅ DOCTOR schema
    z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        specialization: z.string(),
        licenseNumber: z.string(),
        role: z.literal("DOCTOR"),
    }),

    // ✅ MEDICAL schema
    z.object({
        shopName: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        licenseNumber: z.string(),
        phoneNumber: z.string().optional(),
        role: z.literal("MEDICAL"),
    }),
]);

export type SignupSchemaType = z.infer<typeof signupSchema>;
