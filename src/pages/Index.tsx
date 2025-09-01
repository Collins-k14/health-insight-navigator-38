import { useState } from "react";
import { Stethoscope, Search, MapPin, Shield, Star, Activity, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HeroSection from "@/components/HeroSection";
import SymptomChecker from "@/components/SymptomChecker";
import HealthFinder from "@/components/HealthFinder";
import PremiumPlans from "@/components/PremiumPlans";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'symptoms' | 'finder' | 'premium'>('symptoms');

  const features = [
    {
      icon: <Activity className="h-8 w-8 text-primary" />,
      title: "AI Symptom Analysis",
      description: "Advanced AI analyzes your symptoms and provides detailed health insights with professional accuracy."
    },
    {
      icon: <MapPin className="h-8 w-8 text-accent" />,
      title: "Health Facility Finder",
      description: "Find nearby hospitals, clinics, and pharmacies with real-time availability and directions."
    },
    {
      icon: <Shield className="h-8 w-8 text-success" />,
      title: "Secure Health Records",
      description: "Your medical history and data are encrypted and stored securely with bank-level security."
    },
    {
      icon: <Users className="h-8 w-8 text-warning" />,
      title: "Professional Network",
      description: "Connect with verified healthcare providers and premium medical facilities in your area."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Symptoms Analyzed" },
    { number: "10,000+", label: "Healthcare Facilities" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "24/7", label: "Available Support" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center fade-in-medical">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Navigation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Health, Our Priority
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get instant AI-powered health insights and find the care you need, when you need it.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <Button
              variant={activeTab === 'symptoms' ? 'default' : 'outline'}
              onClick={() => setActiveTab('symptoms')}
              className="flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              Symptom Checker
            </Button>
            <Button
              variant={activeTab === 'finder' ? 'default' : 'outline'}
              onClick={() => setActiveTab('finder')}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Health Finder
            </Button>
            <Button
              variant={activeTab === 'premium' ? 'default' : 'outline'}
              onClick={() => setActiveTab('premium')}
              className="flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              Premium Plans
            </Button>
          </div>

          {/* Tab Content */}
          <div className="fade-in-medical">
            {activeTab === 'symptoms' && <SymptomChecker />}
            {activeTab === 'finder' && <HealthFinder />}
            {activeTab === 'premium' && <PremiumPlans />}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Cutting-edge technology meets compassionate care to provide you with the best health experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="medical-card hover:scale-105 transition-transform duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-muted/50 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <MedicalDisclaimer />

      {/* CTA Section */}
      <section className="py-16 hero-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;