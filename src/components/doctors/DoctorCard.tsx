import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase } from 'lucide-react';
import { DoctorType } from '@/types/review';
import { useRouter } from 'next/navigation';

interface DoctorCardProps {
    doctor: DoctorType;
    onBookAppointment?: (doctorId: string) => void;
    onViewProfile?: (doctorId: string) => void;
}

function DoctorCard({ doctor, onBookAppointment, onViewProfile }: DoctorCardProps) {

    const router = useRouter();

    const handleBookAppointment = () => {
        console.log('Booking appointment with doctor:', doctor.id);
        if (onBookAppointment) {
            onBookAppointment(doctor.id);
        } else {
            router.push(`/book-appointment?doctorId=${doctor.id}`);
        }
    };

    const handleViewProfile = () => {
        console.log('Viewing profile for doctor:', doctor.id);
        if (onViewProfile) {
            onViewProfile(doctor.id);
        } else {
            router.push(`/doctor-profile?doctorId=${doctor.id}`);
        }
    };

    return(
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {doctor.name}
                        </h3>
                        <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                        
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
                        
                        <div className="flex items-center mt-3">
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
                        
                        <div className="flex space-x-2 mt-4">
                            <Button
                                size="sm"
                                onClick={handleViewProfile}
                                variant="outline"
                            >
                                View Profile
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleBookAppointment}
                            >
                                Book Appointment
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default DoctorCard;