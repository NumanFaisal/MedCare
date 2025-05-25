'use client'

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // import toast from sonner


function UserSignin() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast("Login successful!", {
            description: "Welcome back to MedCare",
        });
        router.push('/dashboard/user');
    };

    return (
        <AuthLayout 
            title="Patient Sign In"
            subtitle="Access your personal healthcare dashboard"
            accountType="user"
            isSignIn
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email" 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        required
                        className="border-none shadow-2xl "
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
                        required
                        className="border-none shadow-2xl "
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
            </form>
        </AuthLayout>
    )
}

export default UserSignin;