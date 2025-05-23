'use client'

import Features from "@/components/Features";
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
    </div>
  );
}
