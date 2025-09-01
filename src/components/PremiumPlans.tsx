import { Check, Star, Crown, Zap, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PremiumPlans = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Essential health tools for everyone",
      features: [
        "Basic symptom checker",
        "Find nearby facilities",
        "Limited daily analyses",
        "Standard support",
        "Basic health tips"
      ],
      limitations: [
        "No symptom history",
        "Limited AI features",
        "No premium providers"
      ],
      buttonText: "Get Started",
      popular: false,
      icon: <Shield className="h-8 w-8" />
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "/month",
      description: "Advanced AI health insights and premium access",
      features: [
        "Unlimited AI symptom analysis",
        "Complete symptom history",
        "Premium healthcare providers",
        "Priority support",
        "Advanced health insights",
        "Telemedicine booking",
        "Health trend tracking",
        "Family account sharing"
      ],
      limitations: [],
      buttonText: "Upgrade to Premium",
      popular: true,
      icon: <Star className="h-8 w-8" />
    },
    {
      name: "Healthcare Provider",
      price: "$49.99",
      period: "/month",
      description: "Complete solution for clinics and hospitals",
      features: [
        "All Premium features",
        "Provider dashboard",
        "Patient management",
        "Appointment scheduling",
        "Medical record integration",
        "Analytics and reporting",
        "Staff accounts (up to 10)",
        "Priority listing in search",
        "Custom branding",
        "API access"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      popular: false,
      icon: <Crown className="h-8 w-8" />
    }
  ];

  const handleSubscribe = (planName: string) => {
    // This will integrate with Paystack later
    console.log(`Subscribing to ${planName} plan`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Health Plan</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From basic health tools to comprehensive healthcare solutions, find the perfect plan for your needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={plan.name} 
            className={`medical-card relative ${
              plan.popular 
                ? 'border-2 border-primary shadow-[var(--shadow-medical)] scale-105' 
                : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-2">
              <div className={`mx-auto mb-4 p-3 rounded-full w-fit ${
                plan.popular 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-muted/50 text-muted-foreground'
              }`}>
                {plan.icon}
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                {plan.price}
                {plan.period && <span className="text-lg text-muted-foreground">{plan.period}</span>}
              </div>
              <CardDescription className="text-center">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-success flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  What's included:
                </h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-muted-foreground">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-destructive">×</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <Button
                className={`w-full ${
                  plan.popular 
                    ? 'medical-button text-lg py-6' 
                    : 'py-6'
                }`}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => handleSubscribe(plan.name)}
              >
                {plan.popular && <Zap className="mr-2 h-5 w-5" />}
                {plan.buttonText}
              </Button>

              {/* Special notes */}
              {plan.name === "Premium" && (
                <div className="text-center text-xs text-muted-foreground">
                  Cancel anytime • 7-day free trial
                </div>
              )}
              
              {plan.name === "Healthcare Provider" && (
                <div className="text-center text-xs text-muted-foreground">
                  Custom pricing available for larger organizations
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <Card className="medical-card max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Enterprise Solutions</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Need a custom solution for your healthcare organization? We offer tailored packages for hospitals, 
              health systems, and large clinics with advanced features and dedicated support.
            </p>
            <Button variant="outline">
              Contact Enterprise Sales
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment Security */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Powered by Paystack</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;