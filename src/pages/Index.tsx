
import React from 'react';
import { Car } from 'lucide-react';
import VehicleSearchForm from '@/components/VehicleSearchForm';
import StatsSection from '@/components/StatsSection';

const Index = () => {
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

        {/* Vehicle Search Form */}
        <VehicleSearchForm />

        {/* Features Section */}
        <StatsSection />
      </div>
    </div>
  );
};

export default Index;
