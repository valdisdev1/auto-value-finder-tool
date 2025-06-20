import React, { useState } from 'react';
import { Car, Calendar, Fuel, Gauge, DollarSign, Wrench, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import MultiSelectDropdown from './MultiSelectDropdown';
import RangeSlider from './RangeSlider';

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

const VehicleSearchForm: React.FC = () => {
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
    alert('Search submitted! (This is a demo)');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  const availableModels = formData.make ? carBrands[formData.make as keyof typeof carBrands] || [] : [];

  return (
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
              <MultiSelectDropdown
                selectedItems={formData.engineVolume}
                options={['1.0', '1.2', '1.4', '1.6', '1.8', '2.0', '2.2', '2.4', '2.5', '2.8', '3.0', '3.5', '4.0', '5.0+']}
                placeholder="Select engine volumes"
                onItemChange={(value, checked) => handleMultiSelectChange('engineVolume', value, checked)}
                onRemoveItem={(value) => handleRemoveSelection('engineVolume', value)}
                isOpen={dropdownStates.engineVolume}
                onOpenChange={(open) => handleDropdownOpenChange('engineVolume', open)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                <Wrench className="h-4 w-4" />
                <span>Yearly Technical Inspection Passed</span>
              </Label>
              <MultiSelectDropdown
                selectedItems={formData.technicalInspection}
                options={['Yes', 'No']}
                placeholder="Select inspection status"
                onItemChange={(value, checked) => handleMultiSelectChange('technicalInspection', value, checked)}
                onRemoveItem={(value) => handleRemoveSelection('technicalInspection', value)}
                isOpen={dropdownStates.technicalInspection}
                onOpenChange={(open) => handleDropdownOpenChange('technicalInspection', open)}
              />
            </div>
          </div>

          {/* Fourth Row - Fuel Type and Transmission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                <Fuel className="h-4 w-4" />
                <span>Fuel Type</span>
              </Label>
              <MultiSelectDropdown
                selectedItems={formData.fuelType}
                options={['Gasoline', 'Diesel', 'Hybrid', 'Electric', 'LPG']}
                placeholder="Select fuel types"
                onItemChange={(value, checked) => handleMultiSelectChange('fuelType', value, checked)}
                onRemoveItem={(value) => handleRemoveSelection('fuelType', value)}
                isOpen={dropdownStates.fuelType}
                onOpenChange={(open) => handleDropdownOpenChange('fuelType', open)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
                <GitBranch className="h-4 w-4" />
                <span>Transmission Type</span>
              </Label>
              <MultiSelectDropdown
                selectedItems={formData.transmissionType}
                options={['Manual', 'Automatic']}
                placeholder="Select transmission types"
                onItemChange={(value, checked) => handleMultiSelectChange('transmissionType', value, checked)}
                onRemoveItem={(value) => handleRemoveSelection('transmissionType', value)}
                isOpen={dropdownStates.transmissionType}
                onOpenChange={(open) => handleDropdownOpenChange('transmissionType', open)}
              />
            </div>
          </div>

          {/* Fifth Row - Price Range */}
          <RangeSlider
            label="Price Range"
            icon={<DollarSign className="h-4 w-4" />}
            value={formData.priceRange}
            onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}
            onInputChange={handlePriceRangeInputChange}
            min={0}
            max={200000}
            step={100}
            unit="EUR"
            inputWidth="w-32"
          />

          {/* Sixth Row - Kilometers */}
          <RangeSlider
            label="Kilometers Driven"
            icon={<Gauge className="h-4 w-4" />}
            value={formData.kilometers}
            onValueChange={(value) => setFormData(prev => ({ ...prev, kilometers: value }))}
            onInputChange={handleKilometersInputChange}
            min={0}
            max={500000}
            step={1000}
            unit="KM"
            inputWidth="w-32"
          />

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
  );
};

export default VehicleSearchForm;
