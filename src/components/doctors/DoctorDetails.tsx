import { DoctorType } from "@/types/review";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, ArrowRight, Briefcase, Clock, GraduationCap, MapPin, Star } from "lucide-react";
import { Badge } from "../ui/badge";


interface DoctorDetailsProps {
    doctor: DoctorType;
    onBookAppointment: () => void;
    onGoBack: () => void;
}

function DoctorDetails({ doctor, onBookAppointment, onGoBack }: DoctorDetailsProps) {
    const specializations = ["Heart Surgery", "Cardiac Imaging", "Preventive Cardiology"];
    const languages = ["English", "Hindi"];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{doctor.name}</h1>
              <p className="text-xl text-primary font-medium mt-1">{doctor.specialty}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{doctor.experience} experience</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span>{doctor.hospital}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start mt-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
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

              <div className="mt-4 p-3 bg-primary/10 rounded-lg inline-block">
                <p className="text-sm font-medium">Consultation Fee</p>
                <p className="text-lg font-bold text-primary">{doctor.consultationFee}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About & Specializations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Dr. {doctor.name.split(' ')[1]} is a board-certified {doctor.specialty.toLowerCase()} with over {doctor.experience} of experience in treating patients. 
                Specializing in advanced medical procedures and patient care.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec, index) => (
                  <Badge key={index} >
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 ">
                {languages.map((language, index) => (
                  <Badge key={index} >
                    <span className="text-white">{language}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Availability & Booking */}
        <div className="space-y-6">
          {doctor.availability && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-4 w-4 text-green-600 mr-1" />
                      <p className="text-sm font-medium text-green-800">Available Hours</p>
                    </div>
                    <p className="text-sm text-green-700 font-semibold text-center">
                      {doctor.availability.openTime} - {doctor.availability.closeTime}
                    </p>
                    <p className="text-xs text-green-600 mt-1 text-center">
                      {doctor.availability.workingDays.join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Book Your Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-gray-600">Consultation Fee</p>
                <p className="text-2xl font-bold text-primary">{doctor.consultationFee}</p>
              </div>
              
              <div className="space-y-3">
                <Button onClick={onBookAppointment} className="w-full text-white" size="lg">
                  Book Appointment Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button onClick={onGoBack} variant="outline" className="w-full border-gray-300">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Choose Different Doctor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;