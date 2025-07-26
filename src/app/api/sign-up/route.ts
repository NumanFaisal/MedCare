import bcrypt from "bcryptjs";
import { signupSchema, SignupSchemaType } from "@/app/schemas/signupSchema"
import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma";




export async function POST(request: Request) {
    
    
    const body = await request.json();
    // console.log("Received body:", body);
    
    try {
        // parse request body
         const data: SignupSchemaType = signupSchema.parse(body); // Explicit type

        // Check if user already exists
        const existingPatient = await prisma.patient.findUnique({
            where: { email: data.email },
        });
        const existingDoctor = await prisma.doctor.findUnique({
            where: { email: data.email },
        });
        const existingMedical = await prisma.medical.findUnique({
            where: { email: data.email },
        });

        if (existingPatient || existingDoctor || existingMedical) {
            return Response.json({ 
                error: "Email already in use." 
            }, { status: 400 });
        }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);
        // Create the user based on the role 

        let newUser;

        if (data.role === "PATIENT") {

            // Generate unique patientId (you can customize this logic)
            const patientId = `PAT${Date.now().toString().slice(-6)}`;

            newUser = await prisma.patient.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashedPassword,
                    role: Role.PATIENT,
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
                    role: Role.DOCTOR,
                    specialization: data.specialization,
                    licenseNumber: data.licenseNumber, 

                },
            });
        } else if (data.role === "MEDICAL") {
            newUser = await prisma.medical.create({
                data: {
                    shopName: data.shopName,
                    email: data.email,
                    password: hashedPassword,
                    licenseNumber: data.licenseNumber,
                    phoneNumber: data.phoneNumber ?? null,
                    role: Role.MEDICAL,
                },
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
        console.error("Error during signup:", error);
        return Response.json({
            success: false,
            message: "An unexpected error occurred",
            error: error instanceof Error ? error.message : String(error),
        }, { status: 400 });
    }
}