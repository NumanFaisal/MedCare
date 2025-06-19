
import { PatientType } from "@/types/patient";


//Sample patients data
export const allPatients: PatientType[] =[
    {
        id: "P001",
        name: "Vishal Kumar",
        age: 22,
        gender: "Male",
        condition: "Hypertension",
        lastVisit: "2023-06-01",
        nextAppointment: "2023-06-15",
        phone: "+1 (555) 123-4567",
        email: "vishal.kumar@example.com"
    },
    {
        id: "P002",
        name: "Prince Tiwari",
        age: 21,
        gender: "Male",
        condition: "Asthma",
        lastVisit: "2023-05-22",
        nextAppointment: "2023-07-01",
        phone: "+1 (555) 234-5678",
        email: "prince.w@example.com"
    },
    {
        id: "P003",
        name: "Pratik Anand",
        age: 20,
        gender: "Male",
        condition: "Diabetes Type 2",
        lastVisit: "2023-05-18",
        nextAppointment: "2023-06-10",
        phone: "+1 (555) 345-6789",
        email: "pratik@example.com"
    },
    {
        id: "P004",
        name: "Praveen Johnson",
        age: 35,
        gender: "Female",
        condition: "Migraine",
        lastVisit: "2023-05-15",
        nextAppointment: null,
        phone: "+1 (555) 456-7890",
        email: "c.praveen@example.com"
    },
    {
        id: "P005",
        name: "Utsarg Lee",
        age: 58,
        gender: "Female",
        condition: "Arthritis",
        lastVisit: "2023-04-30",
        nextAppointment: "2023-06-30",
        phone: "+1 (555) 567-8901",
        email: "utsarg.l@example.com"
    }
]

export const filterPatients = (
    query: string,
    gender: string
): PatientType[] => {
    return allPatients.filter(patient => {
        const matchesSearch =
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.condition.toLowerCase().includes(query.toLowerCase()) ||
        patient.id.toLowerCase().includes(query.toLowerCase());

        const matchesFilter =  gender === 'all' || patient.gender.toLowerCase() === gender.toLowerCase(); 

        return matchesSearch && matchesFilter;
    });
};