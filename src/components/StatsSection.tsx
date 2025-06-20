
import React from 'react';
import { Gauge, Car, Calendar } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
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
  );
};

export default StatsSection;
