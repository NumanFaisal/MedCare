import { DoctorType } from "@/types/review";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Briefcase, MapPin, Star } from "lucide-react";


interface DoctorSelectionProps {
    selectedDoctor: DoctorType | null;
    onSelectDoctor: (doctor: DoctorType) => void;
}

function DoctorSelection ({ selectedDoctor, onSelectDoctor }: DoctorSelectionProps) {
    // Sample doctors data - in real app, this would be fetched from API
    const doctors: DoctorType[] = [
        {
            id: "1",
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&w=160&h=160&fit=crop",
            hospital: "City General Hospital",
            location: "Downtown",
            experience: "10+ years",
            rating: 4.8,
            totalReviews: 127,
            consultationFee: "RS.150",
            availability: {
                openTime: "09:00",
                closeTime: "17:00",
                workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            }
        },
        {
            id: "2",
            name: "Dr. Michael Chen",
            specialty: "Dermatologist",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
            hospital: "Metro Health Center",
            location: "Midtown",
            experience: "8+ years",
            rating: 4.6,
            totalReviews: 89,
            consultationFee: "Rs.550",
            availability: {
                openTime: "10:00",
                closeTime: "18:00",
                workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            }
        },
        {
            id: "3",
            name: "Dr. Emily Rodriguez",
            specialty: "Pediatrician",
            image: "https://images.pexels.com/photos/1181696/pexels-photo-1181696.jpeg?auto=compress&w=160&h=160&fit=crop",
            hospital: "Children's Medical Center",
            location: "Uptown",
            experience: "12+ years",
            rating: 4.9,
            totalReviews: 156,
            consultationFee: "RS.300",
            availability: {
                openTime: "08:00",
                closeTime: "16:00",
                workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            }
        },
        {
            id: "4",
            name: "Dr. James Wilson",
            specialty: "Orthopedic Surgeon",
            image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&w=160&h=160&fit=crop",
            hospital: "Sports Medicine Institute",
            location: "Westside",
            experience: "15+ years",
            rating: 4.7,
            totalReviews: 203,
            consultationFee: "RS.400",
            availability: {
                openTime: "09:00",
                closeTime: "17:00",
                workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"]
            }
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Select a Doctor</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {doctors.map((doctor) => (
                        <div
                        key={doctor.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedDoctor?.id === doctor.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => onSelectDoctor(doctor)}
                        >
                            <div className="flex items-start space-x-4">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                                    <p className="text-primary font-medium">{doctor.specialty}</p>
                                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Briefcase className="h-4 w-4 mr-1" />
                                            <span>{doctor.experience}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span>{doctor.location}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{doctor.hospital}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${
                                                star <= Math.floor(doctor.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                }`}
                                            />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">
                                            {doctor.rating.toFixed(1)} ({doctor.totalReviews} reviews)
                                        </span>
                                    </div>
                                        <div className="text-lg font-bold text-primary">
                                            {doctor.consultationFee}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default DoctorSelection;