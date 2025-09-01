import { AlertTriangle, Shield, FileText, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MedicalDisclaimer = () => {
  return (
    <section className="py-16 bg-destructive/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-destructive/20">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-destructive mb-2">
                Important Medical Disclaimer
              </h2>
              <p className="text-muted-foreground">
                Please read this important information about our AI health service
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="mx-auto mb-3 p-2 bg-warning/10 rounded-full w-fit">
                  <FileText className="h-6 w-6 text-warning" />
                </div>
                <h3 className="font-semibold mb-2">Not Medical Advice</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analysis is for informational purposes only and should not replace professional medical consultation.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 p-2 bg-primary/10 rounded-full w-fit">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Consult Healthcare Providers</h3>
                <p className="text-sm text-muted-foreground">
                  Always seek the advice of qualified healthcare professionals for any medical concerns or conditions.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 p-2 bg-destructive/10 rounded-full w-fit">
                  <Phone className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-2">Emergency Situations</h3>
                <p className="text-sm text-muted-foreground">
                  For medical emergencies, call 911 immediately. Do not rely on this app for emergency medical care.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg mb-4">Full Medical Disclaimer</h3>
              
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong>1. No Doctor-Patient Relationship:</strong> The use of this AI-powered symptom checker and health platform does not create a doctor-patient relationship between you and any healthcare provider or our company.
                </p>
                
                <p>
                  <strong>2. Not a Substitute for Professional Medical Care:</strong> The information and analysis provided by our AI system are not intended to diagnose, treat, cure, or prevent any disease or medical condition. Always consult with a qualified healthcare professional for proper medical evaluation and treatment.
                </p>
                
                <p>
                  <strong>3. Accuracy Limitations:</strong> While our AI system strives for accuracy, it may not account for all possible medical conditions, symptoms, or individual health factors. Medical AI is a tool to assist but cannot replace human medical expertise.
                </p>
                
                <p>
                  <strong>4. Emergency Situations:</strong> This platform is not designed for emergency medical situations. If you are experiencing a medical emergency, call 911 (in the US) or your local emergency number immediately.
                </p>
                
                <p>
                  <strong>5. Privacy and Data Security:</strong> We maintain strict privacy standards and comply with HIPAA regulations. Your health information is encrypted and protected, but you should be aware of the inherent risks of sharing medical information online.
                </p>
                
                <p>
                  <strong>6. Liability:</strong> Our company, its employees, and partners are not liable for any health outcomes resulting from the use of this platform. Users assume full responsibility for their healthcare decisions.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View Full Terms
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Button>
            </div>

            <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-success mb-1">We Care About Your Safety</p>
                  <p className="text-muted-foreground">
                    Our platform is designed to complement, not replace, professional healthcare. We encourage you to maintain regular contact with your healthcare providers and use our tools as part of a comprehensive approach to health and wellness.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MedicalDisclaimer;