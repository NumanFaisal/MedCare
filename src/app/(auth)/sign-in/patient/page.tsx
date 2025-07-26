'use client'

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { signIn } from "next-auth/react";
import { useState } from "react";

function UserSignin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const role = "PATIENT"; // Default role for patient sign-in
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            role, // Pass role to NextAuth
            callbackUrl: '/dashboard/patient',
            redirect: false,
        });

        if (res?.error) {
            setError(res.error);
            toast("Please check your credentials and try again.", {
                description: "Ensure your email and password are correct.",
            });
            return;
        }

        toast("Login successful!", {
            description: "Welcome back to MedCare",
        });
        router.push('/dashboard/patient');
    };

    return (
        <AuthLayout 
            title="Patient Sign In"
            subtitle="Access your personal healthcare dashboard"
            accountType="patient"
            isSignIn
        >
            <Toaster />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email" 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-none shadow-xl "
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs text-primary hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <Input 
                        id="password"
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-none shadow-xl "
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="rounded-full "/>
                    <label
                        htmlFor="remember"
                        className="text-sm "
                    >
                        Remember me
                    </label>
                </div>
        
                <Button type="submit" className="w-full text-white">Sign In</Button>
                {error && (
                    <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
                )}
            </form>
        </AuthLayout>
    )
}

export default UserSignin;