import React from "react";
import { PatientType } from "@/types/patient";
import { ChevronDown, ChevronUp, FileText, Mail, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface PatientCardProps {
    patient: PatientType;
    expandedPatient: string | null;
    toggleExpand: (id: string) => void;
}

function PatientCard({ patient, expandedPatient, toggleExpand }: PatientCardProps) {
    const handleCreatePrescription = (patientId: string, patientName: string) => {
        toast("Creating Prescription", {
            description: `Setting up prescription for ${patientName}`,
        });
        // Navigate logic would go here
    };

    // Avoid direct date formatting in JSX for SSR/CSR consistency
    const [lastVisit, setLastVisit] = React.useState("");

    React.useEffect(() => {
        setLastVisit(new Date(patient.lastVisit).toLocaleDateString());
    }, [patient.lastVisit]);

    return (
        <div key={patient.id} className="border-1 border-gray-300 rounded-lg overflow-hidden">
            <div
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleExpand(patient.id)}
            >
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary bg-primary/50 font-medium">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h3 className="font-medium flex items-center">
                            {patient.name}
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded ml-2">
                                {patient.id}
                            </span>
                        </h3>
                        <p className="text-sm text-gray-500">{patient.condition}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium">Last Visit</p>
                        <p className="text-xs text-gray-500">
                            {lastVisit}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="hidden sm:flex items-center gap-1 bg-primary hover:bg-primary/50 text-white"
                            onClick={e => {
                                e.stopPropagation();
                                handleCreatePrescription(patient.id, patient.name);
                            }}
                        >
                            <FileText className="h-4 w-4" />
                            <span>Prescription</span>
                        </Button>
                        {expandedPatient === patient.id ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                </div>
            </div>

            {expandedPatient === patient.id && (
                <div className="p-4 bg-gray-50 border-t border-gray-300">
                    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Age</dt>
                            <dd className="mt-1 text-sm text-gray-900">{patient.age} years</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Gender</dt>
                            <dd className="mt-1 text-sm text-gray-900">{patient.gender}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Next Appointment</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {patient.nextAppointment
                                    ? new Date(patient.nextAppointment).toLocaleDateString()
                                    : 'Not scheduled'}
                            </dd>
                        </div>
                        <div className="sm:col-span-3 border-t border-gray-300 pt-3 mt-2">
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center gap-1 border border-gray-300 hover:bg-[#FDE1D3]  text-gray-600"
                                    onClick={() => handleCreatePrescription(patient.id, patient.name)}
                                >
                                    <FileText className="h-4 w-4" />
                                    Create Prescription
                                </Button>
                                <Button size="sm" variant="outline" className="flex items-center border border-gray-300 hover:bg-[#FDE1D3]  text-gray-600 gap-1">
                                    <Phone className="h-4 w-4" />
                                    {patient.phone}
                                </Button>
                                <Button size="sm" variant="outline" className="flex items-center border border-gray-300 hover:bg-[#FDE1D3]  text-gray-600 gap-1">
                                    <Mail className="h-4 w-4" />
                                    {patient.email}
                                </Button>
                                <Button className=" bg-primary hover:bg-primary/50 text-white" size="sm">View Full History</Button>
                            </div>
                        </div>
                    </dl>
                </div>
            )}
        </div>
    );
}

export default PatientCard;