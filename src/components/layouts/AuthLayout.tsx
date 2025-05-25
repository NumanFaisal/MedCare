import React from 'react';
import Link from 'next/link'


interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    accountType: 'user' | 'doctor' | 'medical';
    isSignIn?: boolean;
}

function AuthLayout({
    children,
    title,
    subtitle,
    accountType,
    isSignIn = true,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-[#E5DEFF] to-[#FDE1D3]">
            <div className="absolute top-4 left-4">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        <path d="M3.22 12H9.5l.5-1 2 4 .5-1h6.78" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">MedCare</span>
                </Link>
            </div>

            <div className="flex-grow flex items-center justify-center p-6">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
                        <p className="text-gray-600">{subtitle}</p>
                    </div>
                    
                    {children}
                    
                    <div className="mt-6 text-center text-sm">
                        {isSignIn ? (
                        <p className="text-gray-600">
                            Don not have an account?{' '}
                            <Link href={`/signup/${accountType}`} className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                        ) : (
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link href={`/signin/${accountType}`} className="text-primary hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                        )}
                    </div>

                    <div className="mt-4 text-center">
                        <div className="flex justify-center space-x-4 text-xs text-gray-500">
                            <Link href="/sign-in/pateint" className={`hover:text-primary ${accountType === 'user' ? 'text-primary' : ''}`}>Patient Portal</Link>
                            <Link href="/sign-in/doctor" className={`hover:text-primary ${accountType === 'doctor' ? 'text-primary' : ''}`}>Doctor Portal</Link>
                            <Link href="/sign-in/medical" className={`hover:text-primary ${accountType === 'medical' ? 'text-primary' : ''}`}>Medical Shop Portal</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;