'use client'

import DashboardLayout from "@/components/layouts/DashboardLayout";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Bell, ChevronRight, Activity, Pill, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link'

// Define the type for an appointment
interface Appointment {
    id: string | number;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    reason?: string;
    status: string;
}

function PatientDashboard() {
    const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    // Load appointments from API on component mount
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('/api/appointments');
                if (response.ok) {
                    const data = await response.json();
                    // Transform API data to match the component's expected format
                    const formattedAppointments = data.appointments.map((apt: any) => ({
                        id: apt.id,
                        doctorName: apt.doctor.name,
                        specialty: apt.doctor.specialization,
                        date: new Date(apt.date).toISOString().split('T')[0], // Convert to date string
                        time: new Date(apt.date).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                        }),
                        reason: apt.reason,
                        status: apt.status.toLowerCase()
                    }));
                    setBookedAppointments(formattedAppointments);
                } else {
                    console.error('Failed to fetch appointments');
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const recentPrescriptions = [
        { id: 1, medication: "Amoxicillin", dosage: "500mg", frequency: "Every 8 hours", doctor: "Dr. Shah Faisal", date: "May 28, 2023" },
        { id: 2, medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", doctor: "Dr. Numan Faisal", date: "May 15, 2023" }
    ];

    const healthIndicators = [
        { name: "Blood Pressure", value: "120/80", status: "Normal" },
        { name: "Heart Rate", value: "72 bpm", status: "Normal" },
        { name: "Blood Sugar", value: "95 mg/dL", status: "Normal" },
    ];

    return (
        <DashboardLayout role="patient">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Patient DashBoard</h1>
                    <p className="text-gray-600 mt-1">Welcome back, john Doe</p>
                </div>

                {/* Ai health */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-3xl flex items-center gap-2">
                            <Bot className="h-5 w-5 text-blue-600" />
                            AI Health Assistant
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Get instant health insights and reduce no-shows with AI-powered assitance
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-3 ">
                            <Button asChild className="bg-blue-700 text-white" >
                                <Link href={"/ai-health"} >
                                    Analyze Symptoms
                                </Link>
                            </Button>
                            <Button asChild variant={"outline"} className="border-none bg-white">
                                <Link href={"ai-health"}>
                                    Get Medicine Suggestions
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Health indicators */}
            <div className="grid gap-4 md:grid-cols-3">
                {healthIndicators.map((indicator, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{indicator.name}</p>
                                    <p className="text-2xl font-bold mt-1">{indicator.value}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${indicator.status === "Normal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                    {indicator.status}
                                </div>
                                <Activity className="text-primary h-10 w-10" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Booked Appointments */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                    My Appointments
                            </CardTitle>
                            <Button size="sm"  asChild>
                                <Link href="/book-appointment" className="text-lg text-white hover:bg-amber-100 rounded-full" >Book New</Link>
                            </Button>
                        </div>  
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-6">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
                                <p className="text-gray-500 text-sm">Loading appointments...</p>
                            </div>
                        ) : bookedAppointments.length > 0 ? (
                            <div className="space-y-4">
                                {bookedAppointments.map(appt => (
                                    <div key={appt.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                                        <div>
                                            <h4 className="font-medium">{appt.doctorName}</h4>
                                            <p className="text-sm text-gray-500">{appt.specialty}</p>
                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {new Date(appt.date).toLocaleDateString()} at {appt.time}
                                            </div>
                                            {appt.reason && (
                                            <p className="text-xs text-gray-400 mt-1">Reason: {appt.reason}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className={`px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                                                appt.status === 'scheduled' || appt.status === 'upcoming' 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : appt.status === 'completed' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                                            </div>
                                            <Button size="sm" variant="outline" className="text-xs">
                                                Details
                                                <ChevronRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                        <div className="text-center py-6">
                            <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <p className="text-gray-500 text-sm mb-3">No appointments booked yet</p>
                            <Button size="sm" asChild className="rounded-full px-8 text-white text-2xl">
                                <Link href="/book-appointment">Book Your First Appointment</Link>
                            </Button>
                        </div>
                    )}
                    </CardContent>
                </Card>
                {/* Recent Prescriptions */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Recent Prescriptions
                            </CardTitle>
                            <Button  size="sm" className="text-lg text-white hover:bg-amber-100 rounded-full" asChild>
                                <Link href="/prescriptions">View All</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                            {recentPrescriptions.length > 0 ? (
                                <div className="space-y-4">
                                    {recentPrescriptions.map(rx => (
                                        <div key={rx.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                                            <div>
                                                <div className="flex items-center">
                                                    <Pill className="h-4 w-4 mr-1 text-primary" />
                                                    <h4 className="font-medium">{rx.medication}</h4>
                                                </div>
                                                    <p className="text-sm text-gray-500">{rx.dosage}, {rx.frequency}</p>
                                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    Prescribed on {rx.date} by {rx.doctor}
                                                </div>
                                            </div>
                                            <Button size="sm" variant="outline" className="text-lg text-gray-600 hover:bg-amber-100 bg-white shadow-md border-none">
                                                Details
                                                <ChevronRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                ) : (
                                <p className="text-gray-500 text-sm">No recent prescriptions</p>
                            )}
                    </CardContent>
                </Card>
                {/* Notifications */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Bell className="h-5 w-5 text-primary" />
                                Notifications
                            </CardTitle>
                            <Button  size="sm" className="text-lg text-white hover:bg-amber-100 rounded-full">
                                Mark All as Read
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className=" w-full">
                        <div className="space-y-4">
                            <div className="p-3 bg-[#E5DEFF]/50 rounded-lg border-1 border-gray-300">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Bell className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">Appointment Reminder</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                        You have an appointment with Dr. Shah Faisal tomorrow at 10:00 AM.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg border-1 border-gray-300">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">New Prescription</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Dr. Numan Faisal has issued a new prescription for you.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg border-1 border-gray-300  ">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Bell className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">Medication Reminder</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                        Remember to take your Lisinopril medication daily.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default PatientDashboard;