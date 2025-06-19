'use client'

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


function CreatePrescription() {
    const router = useRouter()
    const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);

    //Sample list of patients
    const patientsList = [
        { id: "P001", name: "Vishal Kumar" },
        { id: "P002", name: "Prince Tiwari" },
        { id: "P003", name: "Pratik Anand" },
        { id: "P004", name: "Praveen Kumar" },
        { id: "P005", name: "Utsarg Tiwari" },
    ];

    const addMedicationField = () => {
        setMedications([...medications, { name: '', dosage: '', frequency: '', duration: ''}]);
    };

    const removeMedicationField = (index: number) => {
        const updateMedications = [...medications];
        updateMedications.splice(index, 1);
        setMedications(updateMedications);
    };

    const updateMedication = (index: number, field: string, value: string) => {
        const updatedMedications = [...medications];
        updatedMedications[index] = { ...updatedMedications[index], [field]: value };
        setMedications(updatedMedications);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast("Prescription Created",{description: "Prescription has been created successfully."});
        router.push('/dashboard/doctor');
    };

    return (
        <DashboardLayout role="doctor">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Create Prescription</h1>
                    <p className="text-gray-600 mt-1">Write a new prescription for your patient</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Patient Details</CardTitle>
                                <CardDescription className="text-gray-600">Select patient and add diagnosis</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 ">
                                    <Label htmlFor="patient">Select Patient</Label>
                                    <Select >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a patient" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border rounded-full border-gray-100">
                                            {patientsList.map(patient => (
                                                <SelectItem className="hover:bg-[#FDE1D3]" key={patient.id} value={patient.id}>{patient.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="patientId">Patient ID</Label>
                                    <Input  id="patientId" placeholder="Enter Patient ID" />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="diagnosis">Diagnosis</Label>
                                    <Textarea id="diagnosis" placeholder="Enter diagnosis details" />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <Textarea id="notes" placeholder="Any additional information" />
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Prescription Details</CardTitle>
                                <CardDescription className="text-gray-600">Date and reference information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="prescriptionId">Prescription ID</Label>
                                    <Input id="prescriptionId" defaultValue={`RX-${Date.now().toString().slice(-8)}`} readOnly />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="validity">Valid Until</Label>
                                    <Input id="validity" type="date" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <Card className="mt-6">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-2xl">Medications</CardTitle>
                                    <CardDescription className="text-gray-600">Add medications to this prescription</CardDescription>
                                </div>
                                <Button className="border border-primary  hover:bg-primary text-white" type="button" onClick={addMedicationField}>Add Medication</Button>
                            </div>
                        </CardHeader>
                        <CardContent >
                            {medications.map((medication, index) => (
                                <div key={index} className="p-4 border border-gray-100   rounded-lg mb-4 bg-gray-50">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-medium text-xl">Medication #{index + 1}</h3>
                                            {medications.length > 1 && (
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => removeMedicationField(index)}
                                                className="text-gray-600"
                                            >
                                                Remove
                                            </Button>
                                            )}
                                        </div>
                                    
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label  htmlFor={`medication-${index}`}>Medication Name</Label>
                                            <Input 
                                                id={`medication-${index}`} 
                                                value={medication.name}
                                                onChange={(e) => updateMedication(index, 'name', e.target.value)}
                                                placeholder="e.g. Amoxicillin" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                                            <Input 
                                                id={`dosage-${index}`} 
                                                value={medication.dosage}
                                                onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                                                placeholder="e.g. 500mg" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`frequency-${index}`}>Frequency</Label>
                                            <Input 
                                                id={`frequency-${index}`} 
                                                value={medication.frequency}
                                                onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                                                placeholder="e.g. 3 times daily" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`duration-${index}`}>Duration</Label>
                                            <Input 
                                                id={`duration-${index}`} 
                                                value={medication.duration}
                                                onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                                                placeholder="e.g. 7 days" 
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <Label htmlFor={`instructions-${index}`}>Special Instructions</Label>
                                        <Textarea
                                        id={`instructions-${index}`} 
                                        placeholder="e.g. Take with food" 
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        <Button className="border border-gray-300 hover:bg-[#FDE1D3]  text-gray-600" type="button" variant="ghost">Save as Draft</Button>
                        <div className="space-x-2">
                            <Button className="border border-gray-300 hover:bg-[#FDE1D3]  text-gray-600" type="button" variant="outline">Preview</Button>
                            <Button className="border border-primary  hover:bg-primary text-white"  type="submit">Create Prescription</Button>
                        </div>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </DashboardLayout>
    )

}

export default CreatePrescription;