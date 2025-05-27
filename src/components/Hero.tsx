import { Button } from "./ui/button";
import Link from 'next/link'
import { useRouter } from "next/navigation";


function Hero() {

    const router = useRouter();

    return(
        <section className="bg-linear-to-br from-[#E5DEFF] to-[#FDE1D3] py-26 px-70">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                    <h1 className="text-4xl md:text-5xl  mb-6  font-semibold leading-tight">
                        <span className=" bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent ">Connecting</span> Healing Hands<br/> with Those in Need
                    </h1>
                    <p className="text-lg font-semibold text-gray-600 mb-8">
                        MedCare brings together patients, doctors, and medical shops in one <br/> platform for seamless, 
                        compassionate healthcare. Experience the ease <br/> of digital prescriptions, instant connectivity, 
                        and personalized care.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <Button  className=" text-white hover:bg-primary hover:text-white text-lg py-6 px-10 rounded-lg button-hover-effect mr-5">
                            <Link href="/sign-in/patient">Join as patient </Link>
                        </Button>
                        <Button variant="outline" className="border-primary text-primary bg-white hover:bg-primary hover:text-white text-lg py-6 px-8 rounded-lg button-hover-effect">
                            For Healthcare Providers
                        </Button>
                    </div>
                    <div className="mt-4">
                        <Button
                        onClick={() => router.push('/ai-health')}
                        variant="outline"
                        className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 text-sm py-3 px-6 rounded-lg"
                        >
                        🤖 Try AI Health Assistant
                        </Button>
                    </div>
                </div>

                <div className="md:w-1/2 flex justify-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary-light rounded-full animate-pulse-gentle"></div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent rounded-full animate-pulse-gentle"></div>
                        <div className="bg-white p-4 rounded-2xl shadow-xl hero-card relative z-10">
                            <img 
                            src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop"  
                            alt="Doctor with Patient" 
                            className="rounded-xl"
                            width={650}
                            height={375} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

{/* // linear-gradient(to bottom right, #E5DEFF, #FDE1D3) */}