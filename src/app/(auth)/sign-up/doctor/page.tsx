'use client'

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import axios from "axios";

function DoctorSignin() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        licenseNumber: "",
        specialization: "",
        password: "",
        confirmPassword: "",
        terms: false,
        role: "DOCTOR",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await axios.post("/api/sign-up", {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
                licenseNumber: form.licenseNumber,
                specialization: form.specialization,
                role: form.role
            });

            if (res.data?.error) {
                setError(res.data.error);
                toast.error(res.data.error);
                toast("please check your details and try again.", {
                    description: "Ensure all fields are filled correctly."
                })
                return;
            }

            toast("Account created!", {
                description: "Welcome to MedCare",
            });
            router.push('/dashboard/doctor');
        } catch (err: any) {
            console.error("Signup error:", err);
            const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || "Something went wrong. Please try again.";
            setError(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <AuthLayout 
            title="Doctor Registration"
            subtitle="Create your professional medical account"
            accountType="doctor"
            isSignIn={false}
        >
            <Toaster />
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                        id="firstName" 
                        placeholder="Sarah" 
                        required
                        className="border-none shadow-md "
                        value={form.firstName}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                        id="lastName" 
                        placeholder="Smith" 
                        required
                        className="border-none shadow-md "
                        value={form.lastName}
                        onChange={handleChange}
                        />
                    </div>
                </div>


                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email" 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        required
                        className="border-none shadow-md "
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="licenseNumber">Medical License Number</Label>
                    </div>
                    <Input 
                        id="licenseNumber"
                        placeholder="ML123456789"
                        required
                        className="border-none shadow-md "
                        value={form.licenseNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input 
                        id="specialization" 
                        placeholder="Cardiology" 
                        required
                        className="border-none shadow-md "
                        value={form.specialization}
                        onChange={handleChange}
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
                        value={form.password}
                        onChange={handleChange}
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
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox 
                        id="terms" 
                        required 
                        checked={form.terms}
                        onCheckedChange={checked => handleChange({
                            target: {
                                id: "terms",
                                type: "checkbox",
                                checked,
                            } as any
                        } as React.ChangeEvent<HTMLInputElement>)
                        }
                    />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree to the <a href="#" className="text-primary hover:underline">terms of service</a> and <a href="#" className="text-primary hover:underline">privacy policy</a>
                    </label>
                </div>
        
                <Button type="submit" className="w-full text-white">Create Account</Button>
                {error && (
                    <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
                )}
            </form>
        </AuthLayout>
    )
}

export default DoctorSignin;