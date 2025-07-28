import bcrypt from 'bcryptjs';
import { doctorSignupSchema } from '@/app/schemas/doctorSignupSchema';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {

    try {
        const body = await request.json();

        const data = doctorSignupSchema.parse(body);

        // Check if user already exists
        const existingDoctor = await prisma.doctor.findUnique({
            where: { email: data.email },
        });

        if (existingDoctor) {
            return Response.json({
                error: "Email already in use.",   
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const newDoctor = await prisma.doctor.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                age: data.age,
                password: hashedPassword,
                role: data.role,
                licenseNumber: data.licenseNumber,
                specialization: data.specialization,
            },
        })

        return Response.json({
            message: "Signup successful",
            user: newDoctor, 
        }, { status: 201 });  
        

    } catch (error) {
        console.error("Error during signup: ", error);
        return Response.json({ 
            error: "Internal server error" 
            
        }, { status: 500 });
    }

}