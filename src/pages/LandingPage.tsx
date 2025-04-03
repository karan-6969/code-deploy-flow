
import { motion } from "framer-motion";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CallToAction from "@/components/landing/CallToAction";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
