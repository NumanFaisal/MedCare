'use client'

import React from 'react';
import DoctorSearch from '@/components/DoctorSearch';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BookAppointmentPage = () => {
    const router = useRouter();

    return (
        <DashboardLayout role="patient">
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-6">
                        <Button 
                            variant="outline" 
                            onClick={() => router.back()} 
                            className="mb-4 border-gray-300 hover:bg-gray-200"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                        <h1 className="text-3xl font-bold">Book an Appointment</h1>
                        <p className="text-gray-600 mt-1">Find and book appointments with qualified healthcare providers</p>
                    </div>
                    
                    <DoctorSearch />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BookAppointmentPage;