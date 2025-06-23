import React from 'react';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    Heart, 
    Shield, 
    Clock, 
    Users, 
    FileText, 
    MessageSquare, 
    Search, 
    Database,
    Smartphone,
    Lock,
    CheckCircle,
    Star,
    Calendar,
    Pill,
    UserCheck,
    Building2,
    Zap
} from 'lucide-react';

const FeaturesPage = () => {
    const mainFeatures = [
        {
        icon: Heart,
        title: "Complete Health Management",
        description: "Manage your entire health journey from prescriptions to appointments in one secure platform.",
        color: "text-red-500"
        },
        {
        icon: Shield,
        title: "Secure & Private",
        description: "Your medical data is protected with enterprise-grade security and HIPAA compliance.",
        color: "text-blue-500"
        },
        {
        icon: Clock,
        title: "24/7 Access",
        description: "Access your medical records, prescriptions, and communicate with doctors anytime, anywhere.",
        color: "text-green-500"
        },
        {
        icon: Users,
        title: "Connected Care Network",
        description: "Seamlessly connect patients, doctors, and medical shops for coordinated healthcare.",
        color: "text-purple-500"
        }
    ];

    const patientFeatures = [
        {
        icon: FileText,
        title: "Digital Medical Records",
        description: "Store and access your complete medical history securely in the cloud."
        },
        {
        icon: Pill,
        title: "Digital Prescriptions",
        description: "Receive and manage prescriptions digitally with automatic refill reminders."
        },
        {
        icon: Calendar,
        title: "Easy Appointment Booking",
        description: "Book appointments with your preferred doctors with just a few clicks."
        },
        {
        icon: MessageSquare,
        title: "Direct Doctor Communication",
        description: "Message your healthcare providers securely for quick consultations."
        },
        {
        icon: Search,
        title: "Find Healthcare Providers",
        description: "Search and discover qualified doctors and medical facilities near you."
        },
        {
        icon: Smartphone,
        title: "Mobile-First Design",
        description: "Access all features on any device with our responsive design."
        }
    ];

    const doctorFeatures = [
        {
        icon: UserCheck,
        title: "Patient Management",
        description: "Manage patient records, appointments, and treatment history efficiently."
        },
        {
        icon: FileText,
        title: "Digital Prescription System",
        description: "Issue secure digital prescriptions that patients can access instantly."
        },
        {
        icon: Database,
        title: "Medical History Access",
        description: "View complete patient medical history for informed decision making."
        },
        {
        icon: Calendar,
        title: "Appointment Scheduling",
        description: "Manage your schedule and appointments with integrated calendar system."
        },
        {
        icon: MessageSquare,
        title: "Patient Communication",
        description: "Communicate securely with patients through encrypted messaging."
        },
        {
        icon: Star,
        title: "Professional Profile",
        description: "Showcase your expertise and receive patient reviews and ratings."
        }
    ];

    const medicalShopFeatures = [
        {
        icon: CheckCircle,
        title: "Prescription Verification",
        description: "Verify prescription authenticity with advanced digital verification."
        },
        {
        icon: Database,
        title: "Digital Inventory",
        description: "Manage medication inventory with automated tracking and alerts."
        },
        {
        icon: Building2,
        title: "Direct Orders",
        description: "Receive prescription orders directly from doctors and patients."
        },
        {
        icon: Users,
        title: "Provider Network",
        description: "Connect with doctors and patients in your area for seamless service."
        },
        {
        icon: Zap,
        title: "Fast Processing",
        description: "Process prescriptions faster with streamlined digital workflows."
        },
        {
        icon: Lock,
        title: "Secure Transactions",
        description: "Handle all transactions securely with encrypted payment processing."
        }
    ];

    type FeatureCardProps = {
        icon: React.ElementType;
        title: string;
        description: string;
        color?: string;
    };

const FeatureCard = ({ icon: Icon, title, description, color = "text-gray-600" }: FeatureCardProps) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
            <div className="flex items-center space-x-3">
            <Icon className={`h-6 w-6 ${color}`} />
            <CardTitle className="text-lg">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">{description}</p>
        </CardContent>
    </Card>
);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary-light to-accent py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Powerful <span className="gradient-text">Features</span> for Modern Healthcare
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                            Discover how MedCare transforms healthcare delivery with cutting-edge features designed for patients, doctors, and medical professionals.
                        </p>
                        <Button size="lg" className="button-hover-effect text-white">
                            Get Started Today
                        </Button>
                    </div>
                </section>

                {/* Main Features */}
                <section className="py-20 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Why Choose <span className="gradient-text">MedCare</span>?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Our platform brings together the best of modern technology and healthcare expertise.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {mainFeatures.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Patient Features */}
                <section className="py-20 px-4 bg-gray-50">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <Badge variant="secondary" className="mb-4 text-white">For Patients</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Take Control of Your <span className="gradient-text">Health</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Empower yourself with tools to manage your health journey effectively.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {patientFeatures.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Doctor Features */}
                <section className="py-20 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <Badge variant="secondary" className="mb-4 text-white">For Doctors</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Streamline Your <span className="gradient-text">Practice</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Advanced tools to enhance patient care and improve practice efficiency.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {doctorFeatures.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Medical Shop Features */}
                <section className="py-20 px-4 bg-gray-50">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <Badge variant="secondary" className="mb-4 text-white">For Medical Shops</Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Modernize Your <span className="gradient-text">Operations</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Digital tools to enhance customer service and streamline pharmacy operations.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {medicalShopFeatures.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 bg-primary text-white">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Transform Your Healthcare Experience?
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        Join thousands of patients, doctors, and medical professionals who trust MedCare for their healthcare needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="button-hover-effect">
                                Start Free Trial
                            </Button>
                            <Button size="lg" variant="outline" className="button-hover-effect border-white text-white hover:bg-white hover:text-primary">
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default FeaturesPage;