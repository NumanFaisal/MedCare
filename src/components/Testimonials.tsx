

function Testimonials() {
    const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Patient",
        content: "MedCare has transformed my healthcare experience. Having all my prescriptions and medical history in one place saves me so much time and worry. I love being able to message my doctor directly!",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop"
    },
    {
        name: "Dr. Michael Chen",
        role: "Cardiologist",
        content: "As a doctor, I've found MedCare incredibly useful for managing patient prescriptions and communications. The platform is intuitive and helps me provide more personalized care to my patients.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1064&auto=format&fit=crop"
    },
    {
        name: "Raj Patel",
        role: "Medical Shop Owner",
        content: "The digital prescription verification system has streamlined our operations tremendously. We can provide faster service with confidence in the authenticity of prescriptions.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop"
    }
];

    return (
        <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our <span className="gradient-text">Community</span> Says
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from patients, doctors, and medical shop owners about their experience with MedCare.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                >
                    <div className="flex items-center mb-4">
                        <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        loading="lazy"
                        />
                        <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 italic">`{testimonial.content}`</p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}

export default Testimonials