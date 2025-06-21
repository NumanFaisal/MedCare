"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";


function DoctorProfile() {

    // Sample doctor data
    const doctor = {
        id: "D123456",
        firstName: "Sarah",
        lastName: "Smith",
        email: "dr.smith@example.com",
        phone: "+1 (555) 456-7890",
        specialization: "Cardiologist",
        licenseNumber: "MED12345",
        hospitalAffiliation: "City General Hospital",
        education: "Harvard Medical School, MD",
        experience: "15 years",
        languages: "English, Spanish",
        consultationFee: "$150",
        bio: "Dr. Sarah Smith is a board-certified cardiologist with over 15 years of experience in treating heart conditions."
    };

    const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast("Profile Updated", {
            description: "Your profile information has been updated successfully.",
        });
    };

    const handlePasswordUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast("Password Updated", {
            description: "Your password has been changed successfully.",
        });
    };

    return (
        <DashboardLayout  role="doctor">
            <Toaster />
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Doctor Profile</h1>
                    <p className="text-gray-600 mt-1">View and update your Professional information</p>
                </div>

                <Tabs defaultValue="personal">
                    <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3">
                        <TabsTrigger value="personal">Personal Info</TabsTrigger>
                        <TabsTrigger value="professional">Professional Info</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>
                                    Update your personal details and contact information
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleProfileUpdate}>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" defaultValue={doctor.firstName} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" defaultValue={doctor.lastName} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" defaultValue={doctor.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" defaultValue={doctor.phone} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Professional Bio</Label>
                                        <Textarea
                                            id="bio"
                                            defaultValue={doctor.bio}
                                            rows={5}
                                        />
                                        <p className="text-sm text-gray-500">This bio will be visible to patients and on your public profile</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="languages">Languages Spoken</Label>
                                        <Input id="languages" defaultValue={doctor.languages} />
                                        <p className="text-sm text-gray-500">Separate multiple languages with commas</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button className="border bg-white text-primary hover:bg-primary hover:text-white" type="submit">Save Changes</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="professional" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Professional Information</CardTitle>
                                <CardDescription>
                                    Update your proessional details and quatifications
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleProfileUpdate}>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="specialization">Specialization</Label>
                                            <Input id="specialization" defaultValue={doctor.specialization} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="licenseNumber">License Number</Label>
                                            <Input id="licenseNumber" defaultValue={doctor.licenseNumber} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="hospitalAffiliation">Hospital Affiliation</Label>
                                            <Input id="hospitalAffiliation" defaultValue={doctor.hospitalAffiliation} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="experience">Years of Experience</Label>
                                            <Input id="experience" defaultValue={doctor.experience} />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="education">Education & Qualifications</Label>
                                        <Textarea id="education" defaultValue={doctor.education} rows={3} />
                                        <p className="text-sm text-gray-500">List degrees, certifications, and professional qualifications</p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="consultationFee">Consultation Fee</Label>
                                        <Input id="consultationFee" defaultValue={doctor.consultationFee} />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="availability">Availability Schedule</Label>
                                        <Textarea id="availability" placeholder="e.g. Monday-Friday: 9AM-5PM, Saturday: 10AM-2PM" rows={2} />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button className="border bg-white text-primary mt-4 hover:bg-primary hover:text-white" type="submit">Save Changes</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>
                                    Update your password and security preferences
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handlePasswordUpdate}>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input id="currentPassword" type="password" />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input id="newPassword" type="password" />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <Input id="confirmPassword" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button className="border bg-white text-primary hover:bg-primary hover:text-white mt-4 " type="submit">Update Password</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}

export default DoctorProfile;