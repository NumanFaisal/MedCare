import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
// import { PrismaClient } from "@prisma/client";


// const prisma = new PrismaClient();

type User = {
    id: string;
    email: string;
    role: "PATIENT" | "DOCTOR" | "MEDICAL";
};



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
                role: { label: 'Role', type: 'text' }, // Doctor, Patient, Medical Shop
            },
            async authorize(credentials: Record<"email" | "password" | "role", string> | undefined): Promise<User | null> {
                try {
                    if (!credentials) {
                        throw new Error("Missing credentials");
                    }

                    const { email, password, role } = credentials;

                    if (!email || !password || !role) {
                        throw new Error("All fields are required");
                    }

                    let user;
                    // Find user based on role
                    if (role === "DOCTOR") {
                        user = await prisma.doctor.findUnique({ where: { email } });
                    } else if (role === "PATIENT") {
                        user = await prisma.user.findUnique({ where: { email } });
                    } else if (role === "MEDICAL") {
                        user = await prisma.medical.findUnique({ where: { email } });
                    }

                    if (!user) {
                        throw new Error("No user found");
                    }

                    // check if the password matches
                    const isPasswordCorrect = await bcrypt.compare(password, user.password);
                    if (!isPasswordCorrect) {
                        throw new Error("Invalid credentials.");
                    }

                    // Return user details
                    return {
                        id: user.id,
                        email: user.email,
                        role: role as "PATIENT" | "DOCTOR" | "MEDICAL"
                    };
                } catch (error) {
                    console.error(error);
                    throw new Error(error instanceof Error ? error.message : String(error));
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = session.user || {} as User;
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.role = token.role as "PATIENT" | "DOCTOR" | "MEDICAL";
            }
            return session;
        },
    }
};
