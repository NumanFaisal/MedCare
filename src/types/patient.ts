export interface PatientType {
    id: string;
    name: string;
    age: number;
    gender: string;
    condition: string;
    lastVisit: string;
    nextAppointment: string | null;
    phone: string;
    email: string;
}