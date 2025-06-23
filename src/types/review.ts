export interface ReviewType {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface DoctorType {
    id: string;
    name: string;
    specialty: string;
    experience: string;
    location: string;
    rating: number;
    totalReviews: number;
    image: string;
    hospital: string;
    consultationFee: string;
    availability: {
        openTime: string;
        closeTime: string;
        workingDays: string[];
    };
}


