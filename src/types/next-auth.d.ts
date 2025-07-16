import "next-auth"


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