import Link from 'next/link'


function Footer() {
    return (
        <footer className="bg-gray-50 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                <path d="M3.22 12H9.5l.5-1 2 4 .5-1h6.78" />
                                </svg>
                            </div>
                            <span className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent text-2xl font-semibold">MedCare</span>
                        </div>
                        <p className="text-gray-600 mb-4">
                        Connecting patients, doctors, and medical shops for accessible, compassionate healthcare.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/features" className="text-gray-600 hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">For Users</h3>
                        <ul className="space-y-2">
                            <li><Link href="/patients" className="text-gray-600 hover:text-primary transition-colors">For Patients</Link></li>
                            <li><Link href="/doctors" className="text-gray-600 hover:text-primary transition-colors">For Doctors</Link></li>
                            <li><Link href="/medical-shops" className="text-gray-600 hover:text-primary transition-colors">For Medical Shops</Link></li>
                            <li><Link href="/faq" className="text-gray-600 hover:text-primary transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-600">Email: info@medcare.com</li>
                            <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
                            <li className="text-gray-600">Address: 123 Healthcare Ave, Medical District</li>
                        </ul>
                    </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} MedCare. All rights reserved.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-gray-500 text-sm hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-500 text-sm hover:text-primary transition-colors">Terms of Use</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;