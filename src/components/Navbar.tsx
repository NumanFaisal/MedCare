'use client' 

import Link from 'next/link'
import { HeartPulse, User, X, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import React ,{ useState } from 'react';

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 " >
            <div  className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2" >
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <HeartPulse color="white" size={34} strokeWidth={2} className="lucide lucide-heart-pulse bg-[#9b87f5] rounded-xl p-1"  />
                    </div>
                    <span className="text-xl font-semibold  bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">MedCare</span>
                </Link>

                <div className="hidden md:flex justify-around items-center space-x-8">
                    <Link href="/about">About </Link>
                    <Link href="/features">Features </Link>
                    <Link href="/contact">Contact </Link>

                    <div className="relative ">
                        <Button  className="border border-primary  hover:bg-primary text-white flex items-center mx-2" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                            <User size={16} />
                            <span>Sign In</span>
                        </Button>

                        {isUserDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-50 bg-white rounded-md overflow-hidden shadow-xl z-20 border-none">
                                <div className="py-2">
                                    <div className="px-4 py-2 text-sm font-medium text-gray-800 border-b-1 ">Choose Portal</div>
                                        <Link 
                                            href="/sign-in/patient" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E5DEFF]"
                                            onClick={() => setIsUserDropdownOpen(false)}
                                        >
                                            Patient Portal
                                        </Link>
                                        <Link 
                                            href="/sign-in/doctor" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E5DEFF]"
                                            onClick={() => setIsUserDropdownOpen(false)}
                                        >
                                            Doctor Portal
                                        </Link>
                                        <Link 
                                            href="/sign-in/medical" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E5DEFF]"
                                            onClick={() => setIsUserDropdownOpen(false)}
                                        >
                                            Medical Shop Portal
                                        </Link>
                                    </div>
                                    <div className="border-t py-1">
                                        <div className="px-4 py-2 text-xs text-gray-500">dont have an account?</div>
                                            <Link 
                                                href="/sign-up/patient" 
                                                className="block px-4 py-2 text-sm text-primary hover:bg-[#E5DEFF]"
                                                onClick={() => setIsUserDropdownOpen(false)}
                                            >
                                                Register Now
                                            </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-primary"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white py-4 px-4 absolute w-full shadow-md animate-fade-in">
                    <div className="flex flex-col space-y-3">
                        <Link href="/about" className="text-gray-600 hover:text-primary py-2 transition-colors">About</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-primary py-2 transition-colors">Contact</Link>
                        
                        <div className="pt-2 border-t border-gray-100">
                            <div className="font-medium text-gray-800 mb-2">Sign In As:</div>
                            <div className="grid grid-cols-1 gap-2">
                                <Button variant="outline" asChild>
                                    <Link href="/sign-in/patient" className="justify-center">
                                        <User className="mr-2 h-4 w-4" />
                                        Patient Portal
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/sign-in/doctor" className="justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                        <path d="M3 10a7 7 0 0 1 7-7" />
                                        <path d="M21 10a7 7 0 0 0-7-7" />
                                        <path d="M3 14a7 7 0 0 0 7 7" />
                                        <path d="M21 14a7 7 0 0 1-7 7" />
                                        <path d="m12 7 1.5 3 3.5.5-2.5 2.2.5 3.5-3-1.5-3 1.5.5-3.5L6.5 10.5l3.5-.5L12 7Z" />
                                        </svg>
                                        Doctor Portal
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/sign-in/medical" className="justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                        <path d="m19 16-7-4-7 4V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13Z" />
                                        </svg>
                                        Medical Shop Portal
                                    </Link>
                                </Button>
                            </div>
                            <div className="mt-3 text-sm text-center">
                                <span className="text-gray-600">New user?</span>{' '}
                                <Link href="/sign-up/patient" className="text-primary hover:underline">Register Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        {/* Overlay to close the user dropdown when clicked outside */}
        {isUserDropdownOpen && (
            <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsUserDropdownOpen(false)}
            ></div>
        )}

        </nav>
    )
}


export default Navbar;