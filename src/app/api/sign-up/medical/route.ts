import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { medicalSignupSchema } from "@/app/schemas/medicalSignupSchema";


export async function POST(request: Request) {

    try {
        
        const body = await request.json();
        const data = medicalSignupSchema.parse(body);

        // check if user already exists 
        const existingMedical = await prisma.medical.findUnique({
            where: { email: data.email },
        })

        if (existingMedical) {
            return Response.json({
                error: "Email already in use.",
            }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newMedical = await prisma.medical.create({
            data: {
                shopName: data.shopName,
                email: data.email,
                address: data.address,
                password: hashedPassword,
                phoneNumber: data.phoneNumber,
                role: data.role,

            }
        })

        return Response.json({
            message: "Signup successful",
            user: newMedical,

        }, { status: 201 });

    } catch (error) {
        console.error("Error during signup: ", error);
        return Response.json({
            error: "Internal server error"
        }, { status: 500 });
    }
}