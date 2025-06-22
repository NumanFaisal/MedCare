'use client'

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CheckCircle, FileText, Package, Search } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";


function FetchPrescriptions() {
    const [patientId,  setPatientId] = useState('');
    const [prescriptionId, setPrescriptionId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [prescription, setPrescription] = useState<any>(null);

    // Sample prescription data
    const samplePrescription = {
        id: "P123456",
        patientName: "Vishal Kumar",
        patientId: "PT78901",
        doctor: "Dr. Numan Faisal",
        date: "2025-06-01",
        medications: [
            { name: "Amoxicillin", dosage: "500mg", frequency: "Every 8 hours", duration: "7 days", quantity: 21 },
            { name: "Ibuprofen", dosage: "400mg", frequency: "Every 6 hours as needed", duration: "5 days", quantity: 20 }
        ],
        diagnosis: "Bacterial infection",
        notes: "Take the full course of antibiotics even if feeling better."
    };

    const handleFetchPrescription = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate inputs
        if (!patientId && !prescriptionId) {
            toast("Error",{
                description: "Please enter either a Patient ID or Prescription ID",
            });
            return;
        }
        
        // Simulate loading
        setIsLoading(true);
        setPrescription(null);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            
            // In a real app, this would be an API call to fetch the prescription
            if (patientId === "PT78901" || prescriptionId === "P123456") {
                setPrescription(samplePrescription);
                toast("Prescription found",{
                    description: "Successfully retrieved prescription details",
                });
            } else {
                toast("No prescription found",{
                    description: "No matching prescription was found with the provided information",
                });
            }
        }, 1500);
    }

    const handleDispenseMedication = () => {
        toast("Prescription Fulfilled",{
            description: "Medications have been marked as dispensed",
        });
    // if backend connect , this would update the prescription status
    };

    return(
        <DashboardLayout role="medical">
            <Toaster />
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Fetch Prescriptions</h1>
                    <p className="text-gray-600 mt-1">Look up patient prescriptions by ID</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Search for Prescription</CardTitle>
                        <CardDescription>
                            Enter a patient ID or prescription ID to find their active prescriptions
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleFetchPrescription}>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="patientId">Patient ID</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            id="patientId" 
                                            className="pl-9" 
                                            placeholder="Enter patient ID..." 
                                            value={patientId}
                                            onChange={(e) => setPatientId(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Example: PT78901</p>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="prescriptionId">Prescription ID</Label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input 
                                            id="prescriptionId" 
                                            className="pl-9" 
                                            placeholder="Enter prescription ID..." 
                                            value={prescriptionId}
                                            onChange={(e) => setPrescriptionId(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Example: P123456</p>
                                </div>
                            </div>
                            
                            <div className="bg-primary-light/30 p-4 rounded-lg">
                                <p className="text-sm">
                                    <span className="font-medium">Note:</span> You need either a Patient ID or Prescription ID to fetch prescription details.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button type="submit" disabled={isLoading} className="border border-primary  hover:bg-primary text-white">
                                {isLoading ? 'Searching...' : 'Find Prescription'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {isLoading && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="mt-4 text-gray-500">Searching for prescription...</p>
                    </div>
                )}

                {prescription && (
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-xl">Prescription Details</CardTitle>
                                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    Active
                                </div>
                            </div>
                            <CardDescription>
                                Prescription ID: {prescription.id}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                <div>
                                    <h3 className="font-medium text-sm text-gray-500 mb-1">Patient Information</h3>
                                    <div className="p-4 border border-gray-400 rounded-lg">
                                        <p className="font-medium">{prescription.patientName}</p>
                                        <p className="text-sm text-gray-500">Patient ID: {prescription.patientId}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium text-sm text-gray-500 mb-1">Prescription Information</h3>
                                    <div className="p-4 border border-gray-400 rounded-lg">
                                        <p className="font-medium">Dr. {prescription.doctor}</p>
                                        <p className="text-sm text-gray-500">
                                        Date: {new Date(prescription.date).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">Diagnosis: {prescription.diagnosis}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="font-medium text-sm text-gray-500 mb-1">Medications</h3>
                                <div className="border border-gray-400 rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Medication
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dosage
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Frequency
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Duration
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Quantity
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {prescription.medications.map((medication: any, index: number) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 text-sm font-medium">{medication.name}</td>
                                            <td className="px-4 py-3 text-sm">{medication.dosage}</td>
                                            <td className="px-4 py-3 text-sm">{medication.frequency}</td>
                                            <td className="px-4 py-3 text-sm">{medication.duration}</td>
                                            <td className="px-4 py-3 text-sm">{medication.quantity} pills</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            {prescription.notes && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium mb-1">Notes</h3>
                                    <p className="text-sm">{prescription.notes}</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 items-center">
                            <div className="flex items-center text-green-600 bg-green-50 px-3 py-2  rounded-lg"> 
                                <Package className="h-5 w-5 mr-2" />
                                <span>All medications in stock</span>
                            </div>
                            
                            <div className="flex gap-2">
                                <Button variant="ghost" className="border-gray-300 border">Print Details</Button>
                                <Button onClick={handleDispenseMedication} className="flex items-center gap-1 border border-primary  hover:bg-primary text-white">
                                    <CheckCircle className="h-4 w-4" />
                                    Mark as Dispensed
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    )
}

export default FetchPrescriptions;