
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface RangeSliderProps {
  label: string;
  icon: React.ReactNode;
  value: number[];
  onValueChange: (value: number[]) => void;
  onInputChange: (index: number, value: string) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  inputWidth?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  icon,
  value,
  onValueChange,
  onInputChange,
  min,
  max,
  step,
  unit,
  inputWidth = "w-32"
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-slate-200 flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </Label>
      <div className="space-y-3">
        <Slider
          value={value}
          onValueChange={onValueChange}
          max={max}
          min={min}
          step={step}
          className="w-full"
        />
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-300 min-w-[30px]">From:</span>
            <div className="relative">
              <Input
                type="number"
                value={value[0]}
                onChange={(e) => onInputChange(0, e.target.value)}
                className={`h-8 ${inputWidth} text-xs bg-slate-700/50 border-slate-600 text-slate-100 pr-12`}
                min={min}
                max={max}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">{unit}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-300 min-w-[20px]">To:</span>
            <div className="relative">
              <Input
                type="number"
                value={value[1]}
                onChange={(e) => onInputChange(1, e.target.value)}
                className={`h-8 ${inputWidth} text-xs bg-slate-700/50 border-slate-600 text-slate-100 pr-12`}
                min={min}
                max={max}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">{unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
