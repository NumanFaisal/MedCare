import Footer from "@/components/Footer";


function About() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
                <div className="py-20 px-4 bg-hero-pattern">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">
                        About <span className="gradient-text">MedCare</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our mission is to make healthcare more accessible, connected, and compassionate.
                        </p>
                    </div>
                </div>
                
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
                        <p className="text-gray-600 mb-8">
                        MedCare was founded with a simple yet powerful vision: to create a healthcare ecosystem where patients, 
                        doctors, and medical shops can seamlessly connect, communicate, and collaborate. Born out of the challenges 
                        faced in traditional healthcare systems, we set out to build a platform that prioritizes accessibility, 
                        efficiency, and above all, compassionate care.
                        </p>
                        
                        <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
                        <p className="text-gray-600 mb-8">
                        We believe that healthcare should be accessible to everyone, everywhere. Our mission is to leverage technology 
                        to break down barriers in healthcare access, improve communication between patients and providers, and create 
                        a more connected healthcare ecosystem. We are committed to putting patients at the center of their healthcare journey, 
                        empowering them with the tools and information they need to make informed decisions about their health.
                        </p>
                        
                        <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="feature-card">
                                <h3 className="font-semibold text-xl mb-2">Compassion</h3>
                                <p className="text-gray-600">
                                We believe that empathy and understanding should be at the core of all healthcare interactions. 
                                Our platform is designed to foster compassionate care at every touchpoint.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h3 className="font-semibold text-xl mb-2">Innovation</h3>
                                <p className="text-gray-600">
                                We continuously push boundaries to find creative solutions to healthcare challenges, 
                                leveraging cutting-edge technology to improve the healthcare experience.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h3 className="font-semibold text-xl mb-2">Accessibility</h3>
                                <p className="text-gray-600">
                                We are committed to making quality healthcare accessible to all, regardless of location, 
                                background, or circumstances.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h3 className="font-semibold text-xl mb-2">Trust</h3>
                                <p className="text-gray-600">
                                We uphold the highest standards of privacy, security, and integrity in everything we do, 
                                ensuring that our users can trust us with their most sensitive information.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default About;