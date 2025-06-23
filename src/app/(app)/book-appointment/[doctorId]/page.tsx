'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import DoctorSelection from '@/components/doctors/DoctorSelection';
import { DoctorType } from '@/types/review';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import DoctorDetails from '@/components/doctors/DoctorDetails';



const BookAppointment = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);
    const [formData, setFormData] = useState({
        patientName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        reason: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = () => {
        if (currentStep === 1 && !selectedDoctor) {
            toast("Please select a doctor", {
                description: "You must choose a doctor before proceeding.",
            });
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleBookAppointment = () => {
        setCurrentStep(3);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDoctor) {
            toast("Error", {
                description: "Please select a doctor.",
            });
            return;
        }
        const appointment = {
            id: Date.now().toString(),
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.name,
            specialty: selectedDoctor.specialty,
            patientName: formData.patientName,
            date: formData.date,
            time: formData.time,
            reason: formData.reason,
            status: 'upcoming'
        };
        const existingAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
        existingAppointments.push(appointment);
        localStorage.setItem('userAppointments', JSON.stringify(existingAppointments));
        toast("Appointment Booked", {
            description: `Your appointment with ${selectedDoctor.name} has been scheduled successfully.`,
        });
        router.push('/dashboard/user');
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                </div>
                <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    {currentStep > 3 ? <CheckCircle className="w-5 h-5" /> : '3'}
                </div>
                <div className={`w-16 h-1 ${currentStep >= 4 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    4
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Toaster />
            <main className="flex-grow bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-6">
                        <Button variant="outline" onClick={() => router.back()} className="mb-4 border-gray-300 hover:bg-gray-200">
                            ← Back
                        </Button>
                        <h1 className="text-3xl font-bold">Book Appointment</h1>
                        <p className="text-gray-600 mt-1">Schedule your appointment with a doctor</p>
                    </div>
                    {renderStepIndicator()}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <DoctorSelection selectedDoctor={selectedDoctor} onSelectDoctor={setSelectedDoctor} />
                            <div className="flex justify-end">
                                <Button onClick={handleNextStep} disabled={!selectedDoctor} className='text-white'>
                                    View Doctor Details
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && selectedDoctor && (
                        <DoctorDetails doctor={selectedDoctor} onBookAppointment={handleBookAppointment} onGoBack={handlePrevStep} />
                    )}
                    {currentStep === 3 && selectedDoctor && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Selected Doctor</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center">
                                            <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                                            <h3 className="text-xl font-semibold">{selectedDoctor.name}</h3>
                                            <p className="text-primary font-medium">{selectedDoctor.specialty}</p>
                                            <p className="text-sm text-gray-600 mt-2">{selectedDoctor.hospital}</p>
                                            <div className="mt-4 p-3 bg-primary-light rounded-lg">
                                                <p className="text-sm font-medium">Consultation Fee</p>
                                                <p className="text-lg font-bold text-primary">{selectedDoctor.consultationFee}</p>
                                            </div>
                                            {selectedDoctor.availability && (
                                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                    <div className="flex items-center justify-center mb-2">
                                                        <Clock className="h-4 w-4 text-green-600 mr-1" />
                                                        <p className="text-sm font-medium text-green-800">Available Hours</p>
                                                    </div>
                                                    <p className="text-sm text-green-700 font-semibold">
                                                        {selectedDoctor.availability.openTime} - {selectedDoctor.availability.closeTime}
                                                    </p>
                                                    <p className="text-xs text-green-600 mt-1">
                                                        {selectedDoctor.availability.workingDays.join(", ")}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Appointment Details</CardTitle>
                                        <CardDescription>
                                            Please fill in your details to book an appointment
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-medium flex items-center">
                                                    <User className="mr-2 h-5 w-5" />
                                                    Personal Information
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="patientName">Full Name *</Label>
                                                        <Input id="patientName" name="patientName" value={formData.patientName} onChange={handleInputChange} required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone">Phone Number *</Label>
                                                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email Address *</Label>
                                                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-medium flex items-center">
                                                    <Calendar className="mr-2 h-5 w-5" />
                                                    Appointment Schedule
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="date">Preferred Date *</Label>
                                                        <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="time">Preferred Time *</Label>
                                                        <Input id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} min={selectedDoctor.availability?.openTime} max={selectedDoctor.availability?.closeTime} required />
                                                        {selectedDoctor.availability && (
                                                            <p className="text-xs text-gray-500">
                                                                Available: {selectedDoctor.availability.openTime} - {selectedDoctor.availability.closeTime}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-medium">Reason for Visit</h3>
                                                <div className="space-y-2">
                                                    <Label htmlFor="reason">Describe your symptoms or reason for consultation</Label>
                                                    <Textarea id="reason" name="reason" value={formData.reason} onChange={handleInputChange} rows={4} placeholder="Please describe your symptoms, concerns, or reason for this appointment..." />
                                                </div>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                                <div className="flex gap-4 mt-6">
                                    <Button type="button" className='border-gray-300' variant="outline" onClick={handlePrevStep}>
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Doctor Details
                                    </Button>
                                    <Button type="button" onClick={() => setCurrentStep(4)} className="flex-1 text-white">
                                        Review & Confirm
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 4 && selectedDoctor && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Review Your Appointment</CardTitle>
                                    <CardDescription>
                                        Please review your appointment details before confirming
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-3">Doctor Information</h3>
                                            <div className="space-y-2 text-sm">
                                                <p><strong>Name:</strong> {selectedDoctor.name}</p>
                                                <p><strong>Specialty:</strong> {selectedDoctor.specialty}</p>
                                                <p><strong>Hospital:</strong> {selectedDoctor.hospital}</p>
                                                <p><strong>Fee:</strong> {selectedDoctor.consultationFee}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-3">Appointment Details</h3>
                                            <div className="space-y-2 text-sm">
                                                <p><strong>Patient:</strong> {formData.patientName}</p>
                                                <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</p>
                                                <p><strong>Time:</strong> {formData.time}</p>
                                                <p><strong>Phone:</strong> {formData.phone}</p>
                                                <p><strong>Email:</strong> {formData.email}</p>
                                                {formData.reason && <p><strong>Reason:</strong> {formData.reason}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="flex gap-4">
                                <Button type="button" className='border border-gray-300' variant="outline" onClick={handlePrevStep}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Edit Details
                                </Button>
                                <Button type="button" onClick={handleSubmit} className="flex-1 text-white">
                                    Confirm Appointment
                                    <CheckCircle className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BookAppointment;
