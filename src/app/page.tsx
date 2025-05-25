'use client'

import CTA from "@/components/CTA";
import DoctorSearch from "@/components/DoctorSearch";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RoleSection from "@/components/RoleSection";
import Testimonials from "@/components/Testimonials";
// import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <RoleSection />
      <DoctorSearch />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
