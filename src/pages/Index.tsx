import React, { useState } from 'react';
import { Car, Calendar, Fuel, Settings, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    engineVolume: '',
    fuelType: '',
    transmissionType: '',
    kilometers: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
                  <Input
                    id="make"
                    placeholder="e.g., Toyota, BMW, Mercedes"
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    className="h-12 text-lg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-sm font-medium text-gray-700">
                    Model
                  </Label>
                  <Input
                    id="model"
                    placeholder="e.g., Camry, X5, C-Class"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="h-12 text-lg"
                    required
                  />
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
                    <SelectContent className="bg-white">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engineVolume" className="text-sm font-medium text-gray-700">
                    Engine Volume (L)
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

              {/* Third Row - Fuel Type and Transmission */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fuelType" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Fuel className="h-4 w-4" />
                    <span>Fuel Type</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('fuelType', value)}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="gasoline">Gasoline</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="lpg">LPG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transmission" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Transmission Type</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('transmissionType', value)}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="cvt">CVT</SelectItem>
                      <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fourth Row - Kilometers */}
              <div className="space-y-2">
                <Label htmlFor="kilometers" className="text-sm font-medium text-gray-700">
                  Kilometers Driven
                </Label>
                <Input
                  id="kilometers"
                  placeholder="e.g., 120000"
                  value={formData.kilometers}
                  onChange={(e) => handleInputChange('kilometers', e.target.value)}
                  className="h-12 text-lg"
                  type="number"
                  required
                />
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
