// import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/app/schemas/signupSchema"
import { prisma } from "@/lib/prisma";




export async function POST(request: Request) {
    
    // parse request body
    const body = await request.json();
    console.log("Received body:", body);

    try {
        const data = signupSchema.parse(body);  // Validate body with Zod schema

        // hash the password before saving it
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Generate a user Unique Id id not provided
        const patientId = data.patientId || `PAT-${Math.random().toString(36).substr(2, 9)}`;

        // Create the user based on the role 

        let newUser;

        if (data.role === "PATIENT") {
            newUser = await prisma.patient.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashedPassword,
                    role: data.role === "PATIENT" ? "PATIENT" : "DOCTOR", // Ensure role is set correctly
                    patientId,
                },
            });
        } else if (data.role === "DOCTOR") {
            newUser = await prisma.doctor.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashedPassword,
                    role: data.role === "DOCTOR" ? "DOCTOR" : "MEDICAL", // Ensure role is set correctly
                    specialization: data.specialization || '',
                    licenseNumber: data.licenseNumber || '',
                },
            });
        } else if (data.role === 'MEDICAL') {
            // For medical users, we don't require firstName/lastName in validation
            // but we need to handle them separately
            const medicalData = {
                shopName: data.shopName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || '',
                email: data.email,
                password: hashedPassword,
                role: data.role === "MEDICAL" ? "MEDICAL" : "PATIENT", // Ensure role is set correctly
                address: data.address || '',
                phoneNumber: data.phoneNumber || '',
            };

            newUser = await prisma.medical.create({
                data: medicalData,
            });
        } else {
            return Response.json({
                success: false,
                message: "Invalid role",
            }, { status: 400 });
        }

        // Respond with the newly created user
        return Response.json({
            success: true,
            message: "User created successfully",
            user: newUser
        }, { status: 201 });

    } catch (error) {
        return Response.json({
            success: false,
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : String(error),
        }, { status: 400 });
    }
}