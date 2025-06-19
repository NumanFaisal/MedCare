'use client'

import { useState } from "react";
import { usePathname } from "next/navigation";
import { User, Menu, X, LogOut, Home, UserCircle, FileText, Stethoscope, Store, ShoppingBag,  } from 'lucide-react';
import Link from 'next/link'
import { Button } from "../ui/button";

interface SidebarLink {
    icon: React.ElementType;
    label: string;
    href: string;
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'patient' | 'doctor' | 'medical';
}

function DashboardLayout({ children, role }: DashboardLayoutProps) {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const getUserLinks = (): SidebarLink[] => {
        switch (role) {
            case 'patient':
                return [
                    { icon: Home, label: 'Dashboard', href: '/dashboard/patient' },
                    { icon: FileText, label: 'Prescriptions', href: '/dashboard/patient/prescriptions' },
                    { icon: UserCircle, label: 'My Profile', href: '/dashboard/patient/profile' },
                ];
            case 'doctor':
                return [
                    { icon: Home, label: 'Dashboard', href: '/dashboard/doctor' },
                    { icon: FileText, label: 'Create Prescription', href: '/dashboard/doctor/create-prescription' },
                    { icon: User, label: 'Patients', href: '/dashboard/doctor/patients' },
                    { icon: UserCircle, label: 'My Profile', href: '/dashboard/doctor/profile' },
                ];
            case 'medical':
                return [
                    { icon: Home, label: 'Dashboard', href: '/dashboard/medical' },
                    { icon: ShoppingBag, label: 'Fetch Prescriptions', href: '/fetch-prescriptions' },
                    { icon: UserCircle, label: 'Shop Profile', href: '/profile/medical' },
                ];
            default:
                return [];
        }
    };

    const links = getUserLinks();
    const roleIcons = {
        patient: <User className="h-5 w-5" />,
        doctor: <Stethoscope className="h-5 w-5" />,
        medical: <Store className="h-5 w-5" />
    };

    const roleTitles = {
        patient: 'Patient Portal',
        doctor: 'Doctor Portal',
        medical: 'Medical Shop Portal'
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse">
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-semibold  bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">MedCare</span>
                            </Link>
                            <div className="ml-4 px-4 py-2  bg-[#E5DEFF] rounded-full flex items-center">
                                <span className="mr-2">{roleIcons[role]}</span>
                                <span className="text-sm font">{roleTitles[role]}</span>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <Button  className="text-gray-600  bg-white hover:text-white" asChild>
                                <Link href="/">
                                <Home className="h-5 w-5 mr-1" />
                                <span>Home</span>
                                </Link>
                            </Button>
                            <Button variant="outline" className="border border-primary text-primary hover:bg-primary hover:text-white flex items-center mx-2">
                                <LogOut className="h-5 w-5 mr-1" />
                                <span>Sign Out</span>
                            </Button>
                        </div>

                        <div className="md:hidden">
                            <Button
                                size="icon"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-grow flex">
                {/* Sidebar for desktop */}
                <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
                    <div className="h-full w-full py-6 px-4">
                        <nav className="space-y-1">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                const Icon = link.icon;
                                
                                return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                                    isActive
                                        ? 'bg-primary-light text-primary'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                    {link.label}
                                </Link>
                                );
                            })}
                        
                            <div className="pt-4 mt-4 border-t border-gray-200">
                                <Button  className="w-full justify-start bg-white hover:text-white text-gray-600 " asChild>
                                    <Link href="/">
                                        <Home className="h-5 w-5 mr-3  hover:text-amber-50" />
                                        Return to Home
                                    </Link>
                                </Button>
                                <Button className="w-full justify-start text-gray-600  mt-2 bg-white hover:text-white">
                                    <LogOut className="h-5 w-5 mr-3 hover:text-amber-50" />
                                    Sign Out
                                </Button>
                            </div>
                        </nav>
                    </div>
                </aside>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-20">
                        <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-30">
                            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse">
                                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                            <path d="M3.22 12H9.5l.5-1 2 4 .5-1h6.78" />
                                        </svg>
                                    </div>
                                    <span className="font-bold gradient-text">MedCare</span>
                                </div>
                                <Button
                                size="icon"
                                onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                        <nav className="px-4 py-6 space-y-2">
                            {links.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;
                            
                            return (
                                <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                                    isActive
                                    ? 'bg-primary-light text-primary'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                >
                                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                {link.label}
                                </Link>
                            );
                        })}
                        
                            <div className="pt-4 mt-4 border-t border-gray-200">
                                <Button
                                    className="w-full justify-start text-gray-600 hover:text-gray-900"
                                    asChild
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Link href="/">
                                    <Home className="h-5 w-5 mr-3 text-gray-400" />
                                    Return to Home
                                    </Link>
                                </Button>
                                <Button 
                                    className="w-full justify-start text-gray-600 hover:text-gray-900 mt-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <LogOut className="h-5 w-5 mr-3 text-gray-400" />
                                    Sign Out
                                </Button>
                            </div>
                        </nav>
                    </div>
                    
                    {/* Click outside to close */}
                    <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                    />
                    </div>
                )}

                {/* Main content */}
                <main className="flex-grow p-6 bg-gray-50 overflow-y-auto">
                {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;