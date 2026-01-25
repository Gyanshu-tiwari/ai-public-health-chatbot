import React, { useState, useEffect } from "react";
import Navbar from "../components/LandingPageComponents/Navbar.jsx";
import Footer from "../components/LandingPageComponents/Footer.jsx";
import CTASection from "../components/LandingPageComponents/CTASection.jsx";
import HeroSection from "../components/LandingPageComponents/HeroSection.jsx";
import InteractivePreview from "../components/LandingPageComponents/InteractivePreview.jsx";
import PricingSection from "../components/LandingPageComponents/PricingSection.jsx";
import FeaturesGrid from "../components/LandingPageComponents/FeaturseGrid.jsx";
import ReviewsSection from "../components/LandingPageComponents/ReviewsSection.jsx";
import ThemedORSAppointmentBooking from "../components/ThemedORSAppointmentBooking.jsx";


import {
  Heart,
  Shield,
  Zap,
  Activity,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Star,
  Menu,
  X,
  Stethoscope,
  Pill,
  ClipboardList,
  Lock,
  Sparkles,
  Smartphone,
  ChevronRight,
  Play,
  Quote,
} from "lucide-react";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden scroll-smooth">
      {/* Dynamic Background */}

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />

        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrolled={scrolled}
      />

      <main className="relative z-10 pt-20">
        <HeroSection />

        <FeaturesGrid />

        <InteractivePreview />

        {/* ORS Appointment Booking Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Book Hospital Appointments
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Schedule appointments at top government hospitals with our ORS-integrated booking system
              </p>
            </div>
            <ThemedORSAppointmentBooking />
          </div>
        </section>

        <ReviewsSection />

        <PricingSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
