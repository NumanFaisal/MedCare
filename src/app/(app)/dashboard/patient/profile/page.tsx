'use client'

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast, Toaster } from "sonner";
import React, { useEffect, useState } from "react";


function PatientProfile() {

    // Sample user data
    const patient = {
        id: "U123456",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        dateOfBirth: "1985-06-15",
        phone: "+1 (555) 123-4567",
        address: "123 Main St",
        city: "Springfield",
        state: "IL",
        pinCode: "62704",
        emergencyContact: "Jane Doe",
        emergencyPhone: "+1 (555) 987-6543",
        bloodType: "O+",
        allergies: "Penicillin",
        medicalConditions: "Hypertension, Asthma",
        lastVisit: "2023-10-10T14:48:00.000Z"
    };

    const [lastVisitDate, setLastVisitDate] = useState("");

    useEffect(() => {
        setLastVisitDate(new Date(patient.lastVisit).toLocaleDateString());
    }, [patient.lastVisit]);

    const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log('handleProfileUpdate called');
        toast("Profile Updated", {
            description: "Your profile information has been updated successfully.",
        });
    };

    const handlePasswordUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        toast( "Password Updated", {
            description: "Your password has been changed successfully.",
        });
    };

    return (
        <DashboardLayout role="patient">
            <Toaster />
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl front-bold">My Profile</h1>
                    <p className="text-gray-600 mt-1">View and update your personal information</p>
                </div>

                <Tabs defaultValue="personal">
                    <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3">
                        <TabsTrigger className="shadow-2xl" value="personal">Personal Info</TabsTrigger>
                        <TabsTrigger value="medical">Medical Info</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Personal Information</CardTitle>
                                <CardDescription className="text-sm text-gray-600">
                                    Update your personal details and contact information
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleProfileUpdate}>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input className="text-gray-600 border-gray-400" id="firstName" defaultValue={patient.firstName} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input className="text-gray-600 border-gray-400" id="lastName" defaultValue={patient.lastName} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input className="text-gray-600 border-gray-400" id="email" defaultValue={patient.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input className="text-gray-600 border-gray-400" id="phone" defaultValue={patient.phone} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                            <Input className="text-gray-600 border-gray-400" id="dateOfBirth" defaultValue={patient.dateOfBirth} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">Street Address</Label>
                                            <Input className="text-gray-600 border-gray-400" id="addressa" defaultValue={patient.address} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input className="text-gray-600 border-gray-400" id="city" defaultValue={patient.city} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State</Label>
                                                <Input className="text-gray-600 border-gray-400" id="state" defaultValue={patient.state} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pinCode">Pin Code</Label>
                                                <Input className="text-gray-600 border-gray-400" id="pinCode" defaultValue={patient.pinCode} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                            <h3 className="text-lg font-medium pb-2">Emergency Contact</h3>
                                            <div className="w-[50%] md:grid-cols-2 gap-6 mt-3">
                                                <div className="space-y-2 pb-2 ">
                                                    <Label className="text-gray-600"  htmlFor="emergencyContact">Contact Phone</Label>
                                                    <Input className="text-gray-600 border-gray-400 "   id="emergencyContact" defaultValue={patient.emergencyContact} />
                                                </div>

                                                <div className="space-y-2 ">
                                                    <Label className="text-gray-600" htmlFor="emergencyPhone">Contact Phone</Label>
                                                    <Input className="text-gray-600 border-gray-400" id="emergencyPhone" defaultValue={patient.emergencyPhone} />
                                                </div>
                                            </div>
                                        </div>
                                </CardContent>
                                <CardFooter className="flex justify-end mt-4">
                                    <Button className="border bg-white text-primary hover:bg-primary hover:text-white" type="submit">Save Changes</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="medical" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Medical Information</CardTitle>
                                <CardDescription>
                                Add your medical details for better healthcare
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleProfileUpdate}>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="bloodType">Blood Type</Label>
                                        <Input className="text-gray-600 border-gray-400" id="bloodType" defaultValue={patient.bloodType} />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="allergies">Allergies</Label>
                                        <Input className="text-gray-600 border-gray-400" id="allergies" defaultValue={patient.allergies} />
                                        <p className="text-sm text-gray-500">Separate multiple allergies with commas</p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="medicalConditions">Medical Conditions</Label>
                                        <Input className="text-gray-600 border-gray-400" id="medicalConditions" defaultValue={patient.medicalConditions} />
                                        <p className="text-sm text-gray-500">Separate multiple conditions with commas</p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="medications">Current Medications</Label>
                                        <Input className="text-gray-600 border-gray-400" id="medications" placeholder="Enter current medications..." />
                                        <p className="text-sm text-gray-500">Separate multiple medications with commas</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button className="border bg-white text-primary hover:bg-primary hover:text-white" type="submit">Save Changes</Button>
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
                                        <Input className="text-gray-600 border-gray-400" id="currentPassword" type="password" />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input className="text-gray-600 border-gray-400" id="newPassword" type="password" />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <Input className="text-gray-600 border-gray-400" id="confirmPassword" type="password" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button className="border bg-white text-primary mt-4 hover:bg-primary hover:text-white" type="submit">Update Password</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
                <p className="text-xs">
                    Last visit: {lastVisitDate}
                </p>
            </div>
        </DashboardLayout>
    )

}

export default PatientProfile;