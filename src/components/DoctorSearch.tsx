import { DoctorType } from "@/types/review";
import { useState } from "react";
import { Search, MapPin, Stethoscope } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DoctorCard from "./doctors/DoctorCard";


function DoctorSearch() {

    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');

  // Sample doctor data - in a real app, this would come from an API
    const sampleDoctors: DoctorType[] = [
        {
        id: '1',
        name: 'Dr. Sarah Smith',
        specialty: 'Cardiologist',
        experience: '15+ years',
        location: 'New York',
        rating: 4.8,
        totalReviews: 234,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop',
        hospital: 'Metropolitan Heart Center'
        },
        {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: 'Dermatologist',
        experience: '12+ years',
        location: 'Los Angeles',
        rating: 4.9,
        totalReviews: 187,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop',
        hospital: 'Sunset Dermatology Clinic'
        },
        {
        id: '3',
        name: 'Dr. Emily Johnson',
        specialty: 'Pediatrician',
        experience: '10+ years',
        location: 'Chicago',
        rating: 4.7,
        totalReviews: 156,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop',
        hospital: 'Children\'s Health Center'
        }
    ];

    const filteredDoctors = sampleDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = location === '' || doctor.location.toLowerCase().includes(location.toLowerCase());
    const matchesSpecialty = specialty === '' || doctor.specialty.toLowerCase().includes(specialty.toLowerCase());
    
    return matchesSearch && matchesLocation && matchesSpecialty;
});

    const handleBookAppointment = (doctorId: string) => {
        console.log('Booking appointment with doctor:', doctorId);
        // In a real app, this would navigate to booking page or open a modal
    };

    const handleViewProfile = (doctorId: string) => {
        console.log('Viewing profile for doctor:', doctorId);
        // In a real app, this would navigate to doctor's profile page
    };

    
    return(
        <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Find Your <span className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">Perfect Doctor</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Search for qualified healthcare providers in your area and book appointments instantly.
                </p>
            </div>

            {/* Search Filters */}
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search doctors or specialties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="relative">
                        <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Specialty"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                        <Button className="bg-primary hover:bg-[#7E69AB] text-white">
                            Search Doctors
                        </Button>
                </div>
            </div>

            {/* Search Results */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                    {filteredDoctors.length} doctors found
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => (
                    <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        onBookAppointment={handleBookAppointment}
                        onViewProfile={handleViewProfile}
                    />
                    ))}
                </div>
                
                {filteredDoctors.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No doctors found matching your criteria.</p>
                        <p className="text-sm text-gray-400 mt-1">Try adjusting your search filters.</p>
                    </div>
                )}
            </div>
        </div>
    </section>
    );
}

export default DoctorSearch;