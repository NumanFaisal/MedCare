'use client'

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // import toast from sonner


function MedicalSignin() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast("Login successful!", {
            description: "Welcome back to MedCare",
        });
        router.push('/dashboard/doctor');
    };

    return (
        <AuthLayout 
            title="Medical Shop Sign In"
            subtitle="Access your pharmacy dashboard"
            accountType="medical"
            isSignIn={false}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input
                        id="shopName" 
                        placeholder="City Pharmacy" 
                        required
                        className="border-none shadow-md "
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email" 
                        type="email" 
                        placeholder="pharmacy@example.com" 
                        required
                        className="border-none shadow-md "
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="licenseNumber">license Number</Label>
                    <Input
                        id="licenseNumber"
                        placeholder="PL123456789" 
                        required
                        className="border-none shadow-md "
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phine"
                        type="tel"
                        placeholder="+91 9876543210" 
                        required
                        className="border-none shadow-md "
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password"
                        type="password"
                        placeholder="••••••••" 
                        required
                        className="border-none shadow-md "
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        required
                        className="border-none shadow-md "
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree to the <a href="#" className="text-primary hover:underline">terms of service</a> and <a href="#" className="text-primary hover:underline">privacy policy</a>
                    </label>
                </div>
        
                <Button type="submit" className="w-full text-white">Create Account</Button>
            </form>
        </AuthLayout>
    )
}

export default MedicalSignin;