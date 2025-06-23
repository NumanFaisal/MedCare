'use client'

import { Button } from "@/components/ui/button";
import { DoctorType } from "@/types/review";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";



function BookAppointment () {
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleNextStep = () => {
        if (currentStep === 1 && !selectedDoctor) {
        toast( "Please select a doctor",{
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
        setCurrentStep(3); // Go to appointment details form
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!selectedDoctor) {
        toast( "Error",{
            description: "Please select a doctor.",
        });
        return;
        }

        console.log('Booking appointment:', { doctorId: selectedDoctor.id, ...formData });
    
        // Store appointment in localStorage for demo purposes
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
        
        toast("Appointment Booked",{
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
                        <Button
                        variant="outline" 
                        onClick={() => router.back()}
                        className="mb-4"
                        >
                        ← Back
                        </Button>
                        <h1 className="text-3xl font-bold">Book Appointment</h1>
                        <p className="text-gray-600 mt-1">Schedule your appointment with a doctor</p>
                    </div>
                    
                    {renderStepIndicator()}

          {/* Step 1: Doctor Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <DoctorSelection
                selectedDoctor={selectedDoctor}
                onSelectDoctor={setSelectedDoctor}
              />
              <div className="flex justify-end">
                <Button onClick={handleNextStep} disabled={!selectedDoctor}>
                  View Doctor Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
                </div>
            </main>
        </div>
    )
}

export default BookAppointment;