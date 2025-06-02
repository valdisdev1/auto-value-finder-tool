import React, { useState } from 'react';
import { Car, Calendar, Fuel, Settings, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Car brands and their popular models
const carBrands = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Prius', 'Highlander', 'Sienna', 'Tacoma', 'Tundra'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Ridgeline'],
  'Ford': ['F-150', 'Escape', 'Explorer', 'Mustang', 'Focus', 'Fusion', 'Edge', 'Expedition'],
  'Chevrolet': ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Tahoe', 'Suburban', 'Camaro', 'Corvette'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'X1', '7 Series', 'i3', 'i8'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class', 'CLA', 'G-Class'],
  'Audi': ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'A8', 'TT'],
  'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'Beetle', 'Arteon', 'ID.4'],
  'Nissan': ['Altima', 'Sentra', 'Rogue', 'Murano', 'Pathfinder', 'Titan', 'Leaf', '370Z'],
  'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Ioniq', 'Genesis'],
  'Kia': ['Optima', 'Forte', 'Sorento', 'Sportage', 'Telluride', 'Soul', 'Stinger', 'Niro'],
  'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5 Miata', 'CX-3', 'CX-30', 'CX-50'],
  'Subaru': ['Outback', 'Forester', 'Impreza', 'Legacy', 'Ascent', 'Crosstrek', 'WRX', 'BRZ'],
  'Lexus': ['ES', 'IS', 'GS', 'LS', 'RX', 'GX', 'LX', 'NX'],
  'Acura': ['TLX', 'ILX', 'RDX', 'MDX', 'NSX', 'TSX', 'RSX', 'Integra']
};

const Index = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    engineVolume: '',
    fuelType: [] as string[],
    transmissionType: [] as string[],
    kilometers: [0, 300000],
    technicalInspection: 'any'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelectChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a price checking API
    alert('Price check submitted! (This is a demo)');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  const availableModels = formData.make ? carBrands[formData.make as keyof typeof carBrands] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">CarPriceChecker</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your Car's Current Market Value
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your vehicle details below to get an accurate price estimate based on current market data
          </p>
        </div>

        {/* Price Checker Form */}
        <Card className="bg-white shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Gauge className="h-6 w-6" />
              <span>Vehicle Information</span>
            </CardTitle>
            <CardDescription className="text-blue-100">
              Please provide accurate information for the best price estimate
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* First Row - Make and Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="make" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Car className="h-4 w-4" />
                    <span>Make</span>
                  </Label>
                  <Select onValueChange={(value) => {
                    handleInputChange('make', value);
                    handleInputChange('model', ''); // Reset model when make changes
                  }}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select car brand" />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-[300px]">
                      {Object.keys(carBrands).map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-sm font-medium text-gray-700">
                    Model
                  </Label>
                  <Select 
                    onValueChange={(value) => handleInputChange('model', value)}
                    disabled={!formData.make}
                  >
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder={formData.make ? "Select model" : "Select make first"} />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-[300px]">
                      {availableModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second Row - Year and Engine Volume */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Year</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white max-h-[300px]">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engineVolume" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Engine Volume (L)</span>
                  </Label>
                  <Input
                    id="engineVolume"
                    placeholder="e.g., 2.0, 3.5, 1.8"
                    value={formData.engineVolume}
                    onChange={(e) => handleInputChange('engineVolume', e.target.value)}
                    className="h-12 text-lg"
                    type="number"
                    step="0.1"
                    required
                  />
                </div>
              </div>

              {/* Third Row - Fuel Type and Transmission (Multi-select) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Fuel className="h-4 w-4" />
                    <span>Fuel Type</span>
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-12 text-lg w-full justify-between">
                        {formData.fuelType.length > 0 
                          ? `${formData.fuelType.length} selected`
                          : "Select fuel types"
                        }
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white">
                      {['Gasoline', 'Diesel', 'Hybrid', 'Electric', 'LPG'].map((fuel) => (
                        <DropdownMenuCheckboxItem
                          key={fuel}
                          checked={formData.fuelType.includes(fuel)}
                          onCheckedChange={(checked) => handleMultiSelectChange('fuelType', fuel, checked)}
                        >
                          {fuel}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Transmission Type</span>
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-12 text-lg w-full justify-between">
                        {formData.transmissionType.length > 0 
                          ? `${formData.transmissionType.length} selected`
                          : "Select transmission types"
                        }
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-white">
                      {['Manual', 'Automatic', 'CVT', 'Semi-Automatic'].map((transmission) => (
                        <DropdownMenuCheckboxItem
                          key={transmission}
                          checked={formData.transmissionType.includes(transmission)}
                          onCheckedChange={(checked) => handleMultiSelectChange('transmissionType', transmission, checked)}
                        >
                          {transmission}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Fourth Row - Technical Inspection */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">
                  Yearly Technical Inspection Passed
                </Label>
                <RadioGroup
                  value={formData.technicalInspection}
                  onValueChange={(value) => handleInputChange('technicalInspection', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any" />
                    <Label htmlFor="any" className="cursor-pointer">Any</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Fifth Row - Kilometers (Slider) */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Gauge className="h-4 w-4" />
                  <span>Kilometers Driven</span>
                </Label>
                <div className="space-y-4">
                  <Slider
                    value={formData.kilometers}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, kilometers: value }))}
                    max={500000}
                    min={0}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formData.kilometers[0].toLocaleString()} km</span>
                    <span>{formData.kilometers[1].toLocaleString()} km</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Get Price Estimate
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Gauge className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate Pricing</h3>
            <p className="text-gray-600">Get real-time market prices based on current data and trends</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All Vehicle Types</h3>
            <p className="text-gray-600">Support for cars, trucks, motorcycles, and commercial vehicles</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Up-to-Date Data</h3>
            <p className="text-gray-600">Our database is updated daily with the latest market information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
