'use client'

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";



function ContactPage (){
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast("Message sent!",{
            description: "We'll get back to you as soon as possible.",
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Contact Us</h1>
                        <p className="text-lg text-gray-600">
                        Have questions about MedCare? We are here to help you.
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded-xl p-6 md:p-8 mb-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="How can we help you?" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message" 
                                    placeholder="Please describe your question or issue in detail..." 
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full text-white">Send Message</Button>
                        </form>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="text-primary w-6 h-6"/>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Phone</h3>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="text-primary w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Email</h3>
                            <p className="text-gray-600">support@medcare.com</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="text-primary w-6 h-6"/>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Address</h3>
                            <p className="text-gray-600">123 Health Street<br />Medical District, CA 90210</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ContactPage;