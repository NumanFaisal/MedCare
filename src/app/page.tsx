'use client'

import CTA from "@/components/CTA";
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
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
