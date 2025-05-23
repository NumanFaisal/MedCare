
import React from 'react'
import { Button } from "@/components/ui/button"

function RoleSection() {

    const roles = [
        {
            title: "For Patients",
            description: "Access your medical records, receive digital prescriptions, and connect with healthcare providers all in one  place.",
            features: [
                "Store and access mmedical history",
                "Recive digital prescriptions",
                "Message your doctors directly",
                "Find nearby medical shops"
            ],
            btnText: "Join as Patient",
            bgColor: "#E5DEFF",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1780&auto=format&fit=crop"
        },
        {
            title: "For Doctors",
            description: "Manage your patients, issue digital prescriptions, and streamline your practice with",
            features: [
                "Issue digital prescriptions",
                "Access patient medical history",
                "Schedule and managge appointments",
                "Communicate securely with patients"
            ],
            btnText: "Register as Doctor",
            bgColor: "#7E69AB",
            image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2072&auto=format&fit=crop"
        },
        {
            title: "For Medical Shops",
            description: "Receive digital prescriptions, verify authenticity, and provide better service to your customers",
            features: [
                "Verify prescription authenticity",
                "Maintain digital inventory",
                "Receive direct orders",
                "Connect with doctors and patients"
            ],
            btnText: "Register Medical Shop",
            bgColor: "#FDE1D3", // #8E9196
            image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop"
        }
    ]

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-semibold mb-5">
                        <span className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">Tailored</span> for Everyone
                    </h1>
                    <p className="text-lg font-semibold text-gray-600 mb-8">
                        MedCare offers customized experiences for patients, doctors, and medical shops,<br /> each with features designed specifically for their needs.
                    </p>
                </div>

                <div className="space-y-16">
                    {roles.map((role, index) => (
                        <div 
                        key={index} 
                        className={`rounded-2xl overflow-hidden shadow-lg flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                        >
                            <div className="lg:w-1/2">
                                <img 
                                src={role.image} 
                                alt={role.title} 
                                className="w-full h-full object-cover"
                                loading="lazy"
                                />
                            </div>
                            <div className={`lg:w-1/2 p-8 ${role.bgColor} flex flex-col justify-center`}>
                                <h3 className="text-2xl font-bold mb-4">{role.title}</h3>
                                <p className="mb-6 text-gray-700">{role.description}</p>
                                <ul className="mb-8 space-y-2">
                                {role.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-primary mr-2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    {feature}
                                    </li>
                                ))}
                                </ul>
                                <Button className="bg-primary hover:bg-[#7E69AB] text-white w-full md:w-auto button-hover-effect">
                                {role.btnText}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}



export default RoleSection