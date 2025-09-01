import { useState } from "react";
import { MapPin, Clock, Star, Phone, Navigation, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HealthFinder = () => {
  const [location, setLocation] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [searchRadius, setSearchRadius] = useState("5");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const facilityTypes = [
    { value: "hospital", label: "🏥 Hospitals", icon: "🏥" },
    { value: "clinic", label: "🏪 Clinics", icon: "🏪" },
    { value: "pharmacy", label: "💊 Pharmacies", icon: "💊" },
    { value: "urgent-care", label: "🚑 Urgent Care", icon: "🚑" },
    { value: "specialist", label: "👩‍⚕️ Specialists", icon: "👩‍⚕️" },
  ];

  const mockResults = [
    {
      id: 1,
      name: "City General Hospital",
      type: "Hospital",
      distance: "0.8 miles",
      rating: 4.8,
      address: "123 Main Street, Downtown",
      phone: "(555) 123-4567",
      openHours: "24/7",
      services: ["Emergency", "Surgery", "ICU", "Maternity"],
      isPremium: true,
      waitTime: "15 min"
    },
    {
      id: 2,
      name: "HealthFirst Clinic",
      type: "Clinic",
      distance: "1.2 miles",
      rating: 4.6,
      address: "456 Oak Avenue, Midtown",
      phone: "(555) 234-5678",
      openHours: "8 AM - 8 PM",
      services: ["General Practice", "Pediatrics", "Vaccines"],
      isPremium: false,
      waitTime: "30 min"
    },
    {
      id: 3,
      name: "QuickCare Pharmacy",
      type: "Pharmacy",
      distance: "0.5 miles",
      rating: 4.7,
      address: "789 Elm Street, Near you",
      phone: "(555) 345-6789",
      openHours: "6 AM - 11 PM",
      services: ["Prescriptions", "OTC Medications", "Health Screening"],
      isPremium: true,
      waitTime: "5 min"
    }
  ];

  const handleSearch = () => {
    if (!location.trim()) return;
    
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 2000);
  };

  const handleLocationDetect = () => {
    setLocation("Detecting your location...");
    setTimeout(() => {
      setLocation("New York, NY");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="medical-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
            <MapPin className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-2xl">Healthcare Facility Finder</CardTitle>
          <CardDescription className="text-lg">
            Find nearby hospitals, clinics, and pharmacies with real-time information
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Search Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Location</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter city or zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="medical-input"
                />
                <Button
                  variant="outline"
                  onClick={handleLocationDetect}
                  className="flex-shrink-0"
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Facility Type</label>
              <Select value={facilityType} onValueChange={setFacilityType}>
                <SelectTrigger className="medical-input">
                  <SelectValue placeholder="Select facility type" />
                </SelectTrigger>
                <SelectContent>
                  {facilityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Search Radius</label>
              <Select value={searchRadius} onValueChange={setSearchRadius}>
                <SelectTrigger className="medical-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 mile</SelectItem>
                  <SelectItem value="5">5 miles</SelectItem>
                  <SelectItem value="10">10 miles</SelectItem>
                  <SelectItem value="25">25 miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {facilityTypes.map((type) => (
              <Button
                key={type.value}
                variant={facilityType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFacilityType(type.value)}
                className="flex items-center gap-2"
              >
                <span>{type.icon}</span>
                {type.label.split(" ")[1]}
              </Button>
            ))}
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={!location.trim() || isSearching}
            className="w-full medical-button text-lg py-6"
          >
            {isSearching ? (
              <>
                <Search className="mr-2 h-5 w-5 animate-spin" />
                Searching Facilities...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Find Healthcare Facilities
              </>
            )}
          </Button>

          {/* Search Results */}
          {showResults && (
            <div className="space-y-4 fade-in-medical">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Found {mockResults.length} facilities near you
                </h3>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <div className="grid gap-4">
                {mockResults.map((facility) => (
                  <Card key={facility.id} className={`border-l-4 hover:shadow-md transition-shadow ${
                    facility.isPremium 
                      ? 'border-l-accent bg-accent/5' 
                      : 'border-l-muted'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-semibold">{facility.name}</h4>
                            {facility.isPremium && (
                              <Badge className="bg-accent text-accent-foreground">
                                ⭐ Premium
                              </Badge>
                            )}
                            <Badge variant="outline">{facility.type}</Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {facility.address} • {facility.distance}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {facility.openHours} • Wait time: {facility.waitTime}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {facility.phone}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-medium">{facility.rating}</span>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-3">
                            {facility.services.map((service) => (
                              <Badge key={service} variant="secondary" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="w-full">
                            <Navigation className="mr-2 h-4 w-4" />
                            Get Directions
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Phone className="mr-2 h-4 w-4" />
                            Call Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthFinder;