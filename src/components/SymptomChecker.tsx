import { useState } from "react";
import { Search, AlertTriangle, Brain, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const commonSymptoms = [
    "Headache", "Fever", "Fatigue", "Cough", "Nausea", 
    "Sore throat", "Body aches", "Dizziness", "Stomach pain", "Shortness of breath"
  ];

  const handleAnalyze = () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleSymptomClick = (symptom: string) => {
    const currentSymptoms = symptoms ? symptoms + ", " + symptom : symptom;
    setSymptoms(currentSymptoms);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="medical-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">AI Symptom Analysis</CardTitle>
          <CardDescription className="text-lg">
            Describe your symptoms and get instant AI-powered health insights
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Symptom Input */}
          <div>
            <label className="block text-sm font-medium mb-3">Describe your symptoms:</label>
            <Textarea
              placeholder="Please describe what you're experiencing in detail. Include when symptoms started, severity, and any relevant information..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="medical-input min-h-32 resize-none"
            />
          </div>

          {/* Quick Symptom Tags */}
          <div>
            <label className="block text-sm font-medium mb-3">Or select common symptoms:</label>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <Badge
                  key={symptom}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSymptomClick(symptom)}
                >
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>

          {/* Analysis Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!symptoms.trim() || isAnalyzing}
            className="w-full medical-button text-lg py-6"
          >
            {isAnalyzing ? (
              <>
                <Brain className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Analyze Symptoms
              </>
            )}
          </Button>

          {/* Analysis Results */}
          {showResults && (
            <div className="space-y-4 fade-in-medical">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-card rounded-lg">
                    <h4 className="font-semibold text-success mb-2">Preliminary Assessment:</h4>
                    <p className="text-muted-foreground">
                      Based on your symptoms, this appears to be a common condition that may benefit from rest and monitoring. 
                      However, professional medical evaluation is recommended for proper diagnosis.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-card rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Recommendations:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Stay hydrated and get adequate rest</li>
                      <li>Monitor symptoms for changes</li>
                      <li>Consider over-the-counter pain relief if appropriate</li>
                      <li>Consult a healthcare provider for proper diagnosis</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Clock className="mr-2 h-4 w-4" />
                      Save to History
                    </Button>
                    <Button className="flex-1">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Find Healthcare
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-warning mb-1">Important Medical Disclaimer</p>
                <p className="text-muted-foreground">
                  This AI analysis is for informational purposes only and should not replace professional medical advice. 
                  Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomChecker;