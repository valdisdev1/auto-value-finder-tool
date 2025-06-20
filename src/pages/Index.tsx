import React, { useState } from 'react';
import { Car, Calendar, Fuel, Gauge, DollarSign, Wrench, GitBranch, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
    yearFrom: '',
    yearTo: '',
    engineVolume: [] as string[],
    fuelType: [] as string[],
    transmissionType: [] as string[],
    kilometers: [0, 300000],
    priceRange: [0, 100000],
    technicalInspection: [] as string[]
  });

  const [dropdownStates, setDropdownStates] = useState({
    engineVolume: false,
    fuelType: false,
    transmissionType: false,
    technicalInspection: false
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

  const handleRemoveSelection = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleDropdownOpenChange = (field: string, open: boolean) => {
    setDropdownStates(prev => ({
      ...prev,
      [field]: open
    }));
  };

  const handlePriceRangeInputChange = (index: number, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      priceRange: index === 0 
        ? [Math.min(numValue, prev.priceRange[1]), prev.priceRange[1]]
        : [prev.priceRange[0], Math.max(numValue, prev.priceRange[0])]
    }));
  };

  const handleKilometersInputChange = (index: number, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      kilometers: index === 0 
        ? [Math.min(numValue, prev.kilometers[1]), prev.kilometers[1]]
        : [prev.kilometers[0], Math.max(numValue, prev.kilometers[0])]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a price checking API
    alert('Search submitted! (This is a demo)');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  const availableModels = formData.make ? carBrands[formData.make as keyof typeof carBrands] || [] : [];

  const renderMultiSelectTrigger = (field: string, items: string[], placeholder: string) => {
    if (items.length === 0) {
      return <span className="text-slate-400">{placeholder}</span>;
    }
    
    return (
      <div className="flex flex-wrap gap-1 items-center flex-1 min-w-0">
        {items.map((item) => (
          <div key={item} className="flex items-center bg-blue-100 text-blue-900 px-2 py-0.5 rounded text-xs shrink-0">
            <span>{item}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveSelection(field, item);
              }}
              className="ml-1 hover:text-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header - Fixed to top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-sm shadow-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-3">
            <Car className="h-7 w-7 text-blue-400" />
            <h1 className="text-xl font-bold text-slate-100">Cartrack</h1>
          </div>
        </div>
      </div>

      {/* Main Content - Add top padding for fixed header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Check the price of desired car
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            We have data from over 50000 listings.
          </p>
        </div>

        {/* Price Checker Form */}
        <Card className="bg-slate-800/95 backdrop-blur-sm shadow-2xl border-slate-700 border">
          <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-t-lg border-b border-slate-600 p-6">
            <CardTitle className="text-xl flex items-center space-x-2">
              <Gauge className="h-5 w-5" />
              <span>Vehicle Information</span>
            </CardTitle>
            <CardDescription className="text-slate-200">
              Please provide accurate information for the best price estimate
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-slate-800/95">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Row - Make and Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make" className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                    <Car className="h-4 w-4" />
                    <span>Make</span>
                  </Label>
                  <Select onValueChange={(value) => {
                    handleInputChange('make', value);
                    handleInputChange('model', '');
                  }}>
                    <SelectTrigger className="h-9 text-sm bg-slate-700/50 border-slate-600 text-slate-100 hover:bg-slate-600/50">
                      <SelectValue placeholder="Select car brand" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 max-h-[300px] z-50">
                      {Object.keys(carBrands).map((brand) => (
                        <SelectItem key={brand} value={brand} className="text-slate-100 hover:bg-slate-600 focus:bg-slate-600">
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-sm font-medium text-slate-200">
                    Model
                  </Label>
                  <Select 
                    onValueChange={(value) => handleInputChange('model', value)}
                    disabled={!formData.make}
                  >
                    <SelectTrigger className="h-9 text-sm bg-slate-700/50 border-slate-600 text-slate-100 hover:bg-slate-600/50 disabled:opacity-50">
                      <SelectValue placeholder={formData.make ? "Select model" : "Select make first"} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 max-h-[300px] z-50">
                      {availableModels.map((model) => (
                        <SelectItem key={model} value={model} className="text-slate-100 hover:bg-slate-600 focus:bg-slate-600">
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second Row - Year From and Year To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearFrom" className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Year From</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('yearFrom', value)}>
                    <SelectTrigger className="h-9 text-sm bg-slate-700/50 border-slate-600 text-slate-100 hover:bg-slate-600/50">
                      <SelectValue placeholder="Select year from" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 max-h-[300px] z-50">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()} className="text-slate-100 hover:bg-slate-600 focus:bg-slate-600">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearTo" className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Year To</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('yearTo', value)}>
                    <SelectTrigger className="h-9 text-sm bg-slate-700/50 border-slate-600 text-slate-100 hover:bg-slate-600/50">
                      <SelectValue placeholder="Select year to" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 max-h-[300px] z-50">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()} className="text-slate-100 hover:bg-slate-600 focus:bg-slate-600">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Third Row - Engine Volume and Technical Inspection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                    <Gauge className="h-4 w-4" />
                    <span>Engine Volume (L)</span>
                  </Label>
                  <DropdownMenu 
                    open={dropdownStates.engineVolume} 
                    onOpenChange={(open) => handleDropdownOpenChange('engineVolume', open)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-9 text-sm w-full justify-between bg-slate-700/50 border-slate-600 text-slate-100 hover:bg-slate-600/50 px-3">
                        {renderMultiSelectTrigger('engineVolume', formData.engineVolume, "Select engine volumes")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-slate-700 border-slate-600 z-50">
                      {['1.0', '1.2', '1.4', '1.6', '1.8', '2.0', '2.2', '2.4', '2.5', '2.8', '3.0', '3.5', '4.0', '5.0+'].map((volume) => (
                        <DropdownMenuCheckboxItem
                          key={volume}
                          checked={formData.engineVolume.includes(volume)}
                          onCheckedChange={(checked) => handleMultiSelectChange('engineVolume', volume, checked)}
                          className="text-slate-100 hover:bg-slate-600 focus:bg-slate-600 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900"
                        >
                          {volume}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                    <Wrench className="h-4 w-4" />
                    <span>Yearly Technical Inspection Passed</span>
                  </Label>
                  <DropdownMenu 
                    open={dropdownStates.technicalInspection} 
                    onOpenChange={(open) => handleDropdownOpenChange('technicalInspection', open)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-9 text-sm w-full justify-between bg-slate-700/50 border-slate-600 text-slate-100 hover:bg-slate-600/50 px-3">
                        {renderMultiSelectTrigger('technicalInspection', formData.technicalInspection, "Select inspection status")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-slate-700 border-slate-600 z-50">
                      {['Yes', 'No'].map((status) => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={formData.technicalInspection.includes(status)}
                          onCheckedChange={(checked) => handleMultiSelectChange('technicalInspection', status, checked)}
                          className="text-slate-100 hover:bg-slate-600 focus:bg-slate-600 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900"
                        >
                          {status}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Fourth Row - Fuel Type and Transmission (Multi-select) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                    <Fuel className="h-4 w-4" />
                    <span>Fuel Type</span>
                  </Label>
                  <DropdownMenu 
                    open={dropdownStates.fuelType} 
                    onOpenChange={(open) => handleDropdownOpenChange('fuelType', open)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-9 text-sm w-full justify-between bg-slate-700/50 border-slate-600 text-slate-100 hover:bg-slate-600/50 px-3">
                        {renderMultiSelectTrigger('fuelType', formData.fuelType, "Select fuel types")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-slate-700 border-slate-600 z-50">
                      {['Gasoline', 'Diesel', 'Hybrid', 'Electric', 'LPG'].map((fuel) => (
                        <DropdownMenuCheckboxItem
                          key={fuel}
                          checked={formData.fuelType.includes(fuel)}
                          onCheckedChange={(checked) => handleMultiSelectChange('fuelType', fuel, checked)}
                          className="text-slate-100 hover:bg-slate-600 focus:bg-slate-600 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900"
                        >
                          {fuel}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                    <GitBranch className="h-4 w-4" />
                    <span>Transmission Type</span>
                  </Label>
                  <DropdownMenu 
                    open={dropdownStates.transmissionType} 
                    onOpenChange={(open) => handleDropdownOpenChange('transmissionType', open)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-9 text-sm w-full justify-between bg-slate-700/50 border-slate-600 text-slate-100 hover:bg-slate-600/50 px-3">
                        {renderMultiSelectTrigger('transmissionType', formData.transmissionType, "Select transmission types")}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full bg-slate-700 border-slate-600 z-50">
                      {['Manual', 'Automatic'].map((transmission) => (
                        <DropdownMenuCheckboxItem
                          key={transmission}
                          checked={formData.transmissionType.includes(transmission)}
                          onCheckedChange={(checked) => handleMultiSelectChange('transmissionType', transmission, checked)}
                          className="text-slate-100 hover:bg-slate-600 focus:bg-slate-600 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900"
                        >
                          {transmission}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Fifth Row - Price Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Price Range</span>
                </Label>
                <div className="space-y-3">
                  <Slider
                    value={formData.priceRange}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}
                    max={200000}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-300 min-w-[30px]">From:</span>
                      <div className="relative">
                        <Input
                          type="number"
                          value={formData.priceRange[0]}
                          onChange={(e) => handlePriceRangeInputChange(0, e.target.value)}
                          className="h-8 w-40 text-xs bg-slate-700/50 border-slate-600 text-slate-100 pr-12"
                          min={0}
                          max={200000}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">EUR</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-300 min-w-[20px]">To:</span>
                      <div className="relative">
                        <Input
                          type="number"
                          value={formData.priceRange[1]}
                          onChange={(e) => handlePriceRangeInputChange(1, e.target.value)}
                          className="h-8 w-40 text-xs bg-slate-700/50 border-slate-600 text-slate-100 pr-12"
                          min={0}
                          max={200000}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">EUR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sixth Row - Kilometers (Slider) */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                  <Gauge className="h-4 w-4" />
                  <span>Kilometers Driven</span>
                </Label>
                <div className="space-y-3">
                  <Slider
                    value={formData.kilometers}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, kilometers: value }))}
                    max={500000}
                    min={0}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-300 min-w-[30px]">From:</span>
                      <div className="relative">
                        <Input
                          type="number"
                          value={formData.kilometers[0]}
                          onChange={(e) => handleKilometersInputChange(0, e.target.value)}
                          className="h-8 w-40 text-xs bg-slate-700/50 border-slate-600 text-slate-100 pr-8"
                          min={0}
                          max={500000}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">KM</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-300 min-w-[20px]">To:</span>
                      <div className="relative">
                        <Input
                          type="number"
                          value={formData.kilometers[1]}
                          onChange={(e) => handleKilometersInputChange(1, e.target.value)}
                          className="h-8 w-40 text-xs bg-slate-700/50 border-slate-600 text-slate-100 pr-8"
                          min={0}
                          max={500000}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">KM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-10 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 border border-slate-600">
              <Gauge className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Total listings</h3>
            <p className="text-slate-300">34000</p>
          </div>
          <div className="text-center">
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 border border-slate-600">
              <Car className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">The most popular car</h3>
            <p className="text-slate-300">Audi A4</p>
          </div>
          <div className="text-center">
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3 border border-slate-600">
              <Calendar className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Cars under market value</h3>
            <p className="text-slate-300">1076</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
