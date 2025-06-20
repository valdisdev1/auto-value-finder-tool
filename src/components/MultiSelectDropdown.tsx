
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { X } from 'lucide-react';

interface MultiSelectDropdownProps {
  selectedItems: string[];
  options: string[];
  placeholder: string;
  onItemChange: (value: string, checked: boolean) => void;
  onRemoveItem: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  selectedItems,
  options,
  placeholder,
  onItemChange,
  onRemoveItem,
  isOpen,
  onOpenChange
}) => {
  const renderTriggerContent = () => {
    if (selectedItems.length === 0) {
      return <span className="text-slate-400">{placeholder}</span>;
    }
    
    return (
      <div className="flex flex-wrap gap-1 items-center flex-1 min-w-0">
        {selectedItems.map((item) => (
          <div key={item} className="flex items-center bg-blue-100 text-blue-900 px-2 py-0.5 rounded text-xs shrink-0">
            <span>{item}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveItem(item);
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
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 text-sm w-full justify-between bg-slate-700/50 border-slate-600 text-slate-100 hover:bg-slate-600/50 px-3">
          {renderTriggerContent()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full bg-slate-700 border-slate-600 z-50">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedItems.includes(option)}
            onCheckedChange={(checked) => onItemChange(option, checked)}
            className="text-slate-100 hover:bg-slate-600 focus:bg-slate-600 data-[state=checked]:bg-slate-100 data-[state=checked]:text-slate-900"
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelectDropdown;
