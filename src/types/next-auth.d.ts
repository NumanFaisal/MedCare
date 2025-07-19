import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
        id: string;
        email: string;
        role: "PATIENT" | "DOCTOR" | "MEDICAL";
        };
    }

    interface User {
        id: string;
        email: string;
        role: "PATIENT" | "DOCTOR" | "MEDICAL";
    }
    }

    declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        role: "PATIENT" | "DOCTOR" | "MEDICAL";
    }
}

