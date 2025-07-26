'use client'

import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import axios, { AxiosError } from "axios";

// A type for storing form errors, mapping field names to error messages.
type FormErrors = {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    general?: string; // For non-field specific errors
};

function UserSignin() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
        role: "PATIENT", // Hardcoded for this specific form
    });
    
    // State to hold validation errors from the backend
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    // Handles changes for all input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
        // Clear the error for the field being edited
        if (errors[id as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [id]: undefined }));
        }
    };
    
    // A specific handler for the shadcn/ui Checkbox component
    const handleCheckboxChange = (checked: boolean) => {
        setForm(prev => ({ ...prev, terms: checked }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Clear previous errors
        setErrors({});

        // --- Client-Side Validation ---
        if (form.password !== form.confirmPassword) {
            setErrors({ ...errors, password: ["Passwords do not match."] });
            return;
        }
        if (!form.terms) {
            setErrors({ ...errors, general: "You must agree to the terms of service." });
            toast.error("Please agree to the terms of service.");
            return;
        }

        setIsLoading(true);

        try {
            // We don't need to send confirmPassword or terms to the backend
            const payload = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
                role: "PATIENT",
            };

            const res = await axios.post("/api/sign-up", payload);

            if (res.data.success) {
                toast.success("Account created!", {
                    description: "Welcome to MedCare. Redirecting you now...",
                });
                router.push('/dashboard/user');
            } 
            // This 'else' block is technically not needed if the backend always throws an error on failure,
            // but it's good practice for handling structured non-error responses.
            else {
                 setErrors({ general: res.data.message || "An unknown error occurred." });
                 toast.error(res.data.message || "An unknown error occurred.");
            }

        } catch (err) {
            const error = err as AxiosError<{ message: string; errors: FormErrors }>;
            const errorData = error.response?.data;

            if (errorData) {
                // Handle structured validation errors from the backend
                if (errorData.errors) {
                    setErrors(errorData.errors);
                    toast.error(errorData.message || "Please check your input.");
                } else {
                    // Handle general errors like "Email already in use"
                    setErrors({ general: errorData.message });
                    toast.error(errorData.message);
                }
            } else {
                // Handle network or other unexpected errors
                const unexpectedErrorMessage = "Something went wrong. Please try again.";
                setErrors({ general: unexpectedErrorMessage });
                toast.error(unexpectedErrorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    // Helper to render error messages
    const renderError = (field: keyof FormErrors) => {
        return errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field]?.[0]}</p>
        );
    };

    return (
        <AuthLayout 
            title="Create Your Patient Account"
            subtitle="Access your personal healthcare dashboard"
            accountType="patient"
            isSignIn={false}
        >
            <Toaster position="top-right" richColors />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                            id="firstName" 
                            placeholder="Sarah" 
                            required
                            className="border-gray-300 shadow-sm"
                            value={form.firstName}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        {renderError('firstName')}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                            id="lastName" 
                            placeholder="Smith" 
                            required
                            className="border-gray-300 shadow-sm"
                            value={form.lastName}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        {renderError('lastName')}
                    </div>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email" 
                        type="email" 
                        placeholder="s.smith@example.com" 
                        required
                        className="border-gray-300 shadow-sm"
                        value={form.email}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {renderError('email')}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password"
                        type="password"
                        placeholder="••••••••" 
                        required
                        className="border-gray-300 shadow-sm"
                        value={form.password}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                     {renderError('password')}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        required
                        className="border-gray-300 shadow-sm"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox 
                        id="terms" 
                        required 
                        checked={form.terms}
                        onCheckedChange={handleCheckboxChange}
                        disabled={isLoading}
                    />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree to the <a href="#" className="text-primary hover:underline">terms of service</a> and <a href="#" className="text-primary hover:underline">privacy policy</a>
                    </label>
                </div>
            
                <Button type="submit" className="w-full text-white" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                
                {errors.general && (
                    <div className="text-red-600 text-sm pt-2 text-center">{errors.general}</div>
                )}
            </form>
        </AuthLayout>
    )
}

export default UserSignin;
