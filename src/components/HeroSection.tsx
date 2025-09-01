import { Heart, Stethoscope, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="hero-section py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Stethoscope className="h-16 w-16 text-white" />
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Health
            <span className="block text-accent">Care at Your Fingertips</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Get instant symptom analysis, find nearby healthcare facilities, and access premium medical guidance—all powered by advanced AI technology.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">95% Accuracy</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <Stethoscope className="h-5 w-5" />
              <span className="text-sm font-medium">Licensed Providers</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 shadow-lg hover:scale-105 transition-transform">
              Check Symptoms Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Find Healthcare
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-12 text-center">
            <p className="text-sm opacity-75 mb-4">Trusted by healthcare professionals worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <span className="opacity-90">🏥 10,000+ Facilities</span>
              <span className="opacity-90">👩‍⚕️ 5,000+ Providers</span>
              <span className="opacity-90">⭐ 4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;