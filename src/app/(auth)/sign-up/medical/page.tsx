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

function MedicalSignin() {
    const router = useRouter();
    const [form, setForm] = useState({
        shopName: "",
        email: "",
        address: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        terms: false,
        role: "MEDICAL",
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
                shopName: form.shopName,
                email: form.email,
                password: form.password,
                address: form.address,
                phoneNumber: form.phoneNumber,
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
            router.push('/dashboard/medical');
        } catch (err: any) {
            setError(err.response?.data?.error || "Something went wrong. Please try again.");
            toast.error(err.response?.data?.error || "Something went wrong. Please try again.");
        }
    };

    return (
        <AuthLayout 
            title="Medical Shop Registration"
            subtitle="Create your pharmacy account"
            accountType="medical"
            isSignIn={false}
        >
            <Toaster />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input
                        id="shopName" 
                        placeholder="City Pharmacy" 
                        required
                        className="border-none shadow-md "
                        value={form.shopName}
                        onChange={handleChange}
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
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Email</Label>
                    <Input
                        id="address"
                        placeholder="123 Main Street, City" 
                        required
                        className="border-none shadow-md "
                        value={form.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+91 9876543210" 
                        required
                        className="border-none shadow-md "
                        value={form.phoneNumber}
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

export default MedicalSignin;