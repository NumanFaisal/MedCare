'use client'

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Download, FileText, Filter, Search } from "lucide-react";
import { useState } from "react";



function PrescriptionPatient(){

    const allPrescriptions = [
        {
            id: "P123456",
            medication: "Amoxicillin",
            dosage: "500mg",
            frequency: "Every 8 hours",
            startDate: "2023-05-28",
            endDate: "2023-06-04",
            doctor: "Dr. Sarah Smith",
            status: "active",
            notes: "Take with food. Complete full course even if symptoms improve."
            },
        {
            id: "P123457",
            medication: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
            startDate: "2023-05-15",
            endDate: "2023-08-15",
            doctor: "Dr. Sarah Smith",
            status: "active",
            notes: "Take in the morning. Monitor blood pressure regularly."
        },
        {
            id: "P123458",
            medication: "Metformin",
            dosage: "1000mg",
            frequency: "Twice daily",
            startDate: "2023-04-10",
            endDate: "2023-07-10",
            doctor: "Dr. Michael Chen",
            status: "active",
            notes: "Take with meals to reduce stomach upset."
        },
        {
            id: "P123459",
            medication: "Simvastatin",
            dosage: "20mg",
            frequency: "Once daily at bedtime",
            startDate: "2023-03-22",
            endDate: "2023-09-22",
            doctor: "Dr. Sarah Smith",
            status: "active",
            notes: "Take at night. Avoid grapefruit juice."
        },
        {
            id: "P123460",
            medication: "Cetirizine",
            dosage: "10mg",
            frequency: "Once daily",
            startDate: "2023-02-15",
            endDate: "2023-03-15",
            doctor: "Dr. Maria Rodriguez",
            status: "expired",
            notes: "Take for allergic symptoms as needed."
        }
    ];

    const [prescription, setPrescription] = useState(allPrescriptions);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedPrescription, setExpandedPrescription] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('all');
    // const [clicked, setClicked] = useState(false);

    // Search and filter precription
    const handleSearch  = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = allPrescriptions.filter(prescription => {
            const matchesSearch = prescription.medication.toLowerCase().includes(query) || prescription.doctor.toLowerCase().includes(query) || prescription.id.toLowerCase().includes(query);

            const matchesFilter = filterStatus === 'all' || prescription.status === filterStatus;
        
            return matchesSearch && matchesFilter;
        });

        setPrescription(filtered);
    };


    const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    
        const filtered = allPrescriptions.filter(prescription => {
            const matchesSearch = prescription.medication.toLowerCase().includes(searchQuery) || prescription.doctor.toLowerCase().includes(searchQuery) ||prescription.id.toLowerCase().includes(searchQuery);
                
            const matchesFilter = 
                status === 'all' || 
                prescription.status === status;
                
            return matchesSearch && matchesFilter;
        });
        
        setPrescription(filtered);
    };

    const toggleExpand = (id: string) => {
        if (expandedPrescription === id) {
            setExpandedPrescription(null);
        } else {
            setExpandedPrescription(id)
        }
    };


    return (

        <DashboardLayout role="patient">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold">
                            My Prescriptions
                        </h1>
                        <p className="text-gray-600 mt-1">
                            View and manage your prescriptions
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h--4 w-4" />
                            <Input 
                                className="pl-9"
                                placeholder="Search prescriptions"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button  className="flex items-center gap-1 text-white" onClick={() => handleFilterChange('all')}>
                                <Filter className="h-4 w-4" />
                                <span>All</span>
                            </Button>
                            <Button
                            variant={filterStatus === 'active' ? 'default' : 'outline'} 
                            className={`flex items-center gap-1 ${
                                filterStatus === 'active' ? 'text-white bg-blue-500' : 'text-black'
                            }`}
                            onClick={() => handleFilterChange('active')}
                            >
                                Active
                            </Button>
                            <Button
                            variant={filterStatus === 'expired' ? 'default' : 'outline'}
                            className="flex items-center gap-1"
                            onClick={() => handleFilterChange('expired')}
                            >
                                Expired
                            </Button>
                        </div>
                    </div>
                </div>
                
                <Card>
                    <CardHeader className="pd-2">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Prescription History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {prescription.length > 0 ? (
                                prescription.map(prescription => (
                                    <div 
                                    key={prescription.id}
                                    className="border-1 border-gray-300 rounded-lg overflow-hidden"
                                    >
                                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => toggleExpand(prescription.id)}
                                        >
                                            <div className="flex items-center space-x-3"> 
                                                <div className={`h-2 w-2 rounded-full ${prescription.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                <div>
                                                    <h3 className="font-medium">{prescription.medication}</h3>
                                                    <p className="text-sm text-gray-500">{prescription.dosage}, {prescription.frequency}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="text-right hidden sm:block"> 
                                                    <p className="text-sm font-medium">{prescription.doctor}</p>
                                                    <p className="text-xs text-gray-500">Issued: {new Date(prescription.startDate).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Button size="sm" variant="outline" className="hidden sm:flex items-center gap-1 bg-primary hover:text-black hover:bg-[#E5DEFF]/50 rounded-lg border-1 border-gray-300 text-white">
                                                        <Download className="h-4 w-4" />
                                                        <span className="sr-only sm:not-sr-only sm:inline-block ">
                                                            Download
                                                        </span>
                                                    </Button>
                                                    {expandedPrescription === prescription.id ? 
                                                        <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                            {expandedPrescription === prescription.id && (
                                                <div className="p-4 bg-gray-50 border-t  border-gray-300">
                                                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                                                        <div>
                                                            <dt className="text-sm font-medium text-gray-500">Prescription ID</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{prescription.id}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="text-sm font-medium text-gray-500">Prescribed By</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{prescription.doctor}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{new Date(prescription.startDate).toLocaleDateString()}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="text-sm font-medium text-gray-500">End Date</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{new Date(prescription.endDate).toLocaleDateString()}</dd>
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <dt className="text-sm font-medium text-gray-500">Instructions</dt>
                                                            <dd className="mt-1 text-sm text-gray-900">{prescription.notes}</dd>
                                                        </div>
                                                        <div className="sm:col-span-2 pt-2">
                                                            <Button size="sm" variant="outline" className="flex items-center gap-1 bg-primary hover:text-black hover:bg-[#E5DEFF]/50 text-white">
                                                            <Download className="h-4 w-4" />
                                                            Download PDF
                                                            </Button>
                                                        </div>
                                                    </dl>
                                                </div>
                                            )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <FileText className="mx-auto h-12 w-12 text-gray-300" />
                                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No prescriptions found</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        No prescriptions match your search or filter criteria.
                                    </p>
                                </div>
                            )}
                            
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}  

export default PrescriptionPatient;