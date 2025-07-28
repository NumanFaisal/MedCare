import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Prisma,Role } from "@/generated/prisma";
import { patientSignupSchema } from "@/app/schemas/patientSignupSchema";


export async function POST(request: Request) {
    // const body = await resquest.json();/

    try {
        const body = await request.json();
        const data = patientSignupSchema.parse(body);


        // Check if user already exists
        const existingPatient = await prisma.patient.findUnique({
            where: { email: data.email },
        });

        if (existingPatient) {
            return Response.json({
                error: "Email already in use.",
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);


        const newUser = await prisma.patient.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                role: data.role as Role,
                patientId: `PAT${Math.floor(100000 + Math.random() * 900000)}`, // Generate unique patientId
                
            } as Prisma.patientUncheckedCreateInput,
        })

        return Response.json({
            message: "Signup successful",
            user: newUser, 
        }, { status: 201 });  
        
        
    } catch (error) {
        console.error("Error during signup:", error);
        return Response.json({ 
            error: "Internal server error" },
            { status: 500 });
    }
}