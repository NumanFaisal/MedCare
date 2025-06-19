"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout";
import NoPatients from "@/components/patients/NoPatients";
import PatientCard from "@/components/patients/PatientCard";
import PatientsFilter from "@/components/patients/PatientsFilter";
import PatientsHeader from "@/components/patients/PatientsHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allPatients, filterPatients } from "@/services/patientData";
import { PatientType } from "@/types/patient";
import { useState } from "react";


function PatientsList() {
    const [patients, setPatients] = useState<PatientType[]>(allPatients);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
    const [filterGender, setFilterGender] = useState('all');

    //Search and filter patients
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query)

        const filtered = filterPatients(query, filterGender);
        setPatients(filtered)
    };

    const handleFilterChange = (value: string) => {
        setFilterGender(value);

        const filtered = filterPatients(searchQuery, value);
        setPatients(filtered);
    };

    const toggleExpand = (id: string) => {
        if (expandedPatient === id) {
            setExpandedPatient(null);
        } else {
            setExpandedPatient(id);
        }
    };

    const resetFilters = () => {
        setSearchQuery('');
        setFilterGender('all');
        setPatients(allPatients);
    };

    return (
        <DashboardLayout role="doctor">
            <div className="space-y-6">
                <PatientsHeader 
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                />

                <PatientsFilter 
                filterGender={filterGender}
                handleFilterChange={handleFilterChange}
                patientCount={patients.length}
                />

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl flex items-center gap-2">
                            Patient Records
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {patients.length > 0 ? (
                                patients.map(patient => (
                                <PatientCard
                                    key={patient.id}
                                    patient={patient}
                                    expandedPatient={expandedPatient}
                                    toggleExpand={toggleExpand}
                                />
                                ))
                            ) : (
                                <NoPatients resetFilters={resetFilters} />
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default PatientsList;