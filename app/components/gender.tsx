'use client'

import React, { useState } from 'react';

interface GenderOption {
  value: string;
  label: string;
}

interface GenderProps {
  options?: GenderOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}
const RadioButton: React.FC<{
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, checked, onChange }) => {
  return (
    <div className="mr-2 flex items-center">
      <input
        id={value}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`relative w-5 h-5 rounded-full border-4 cursor-pointer transition-all duration-200 
        ${checked ? 'border-white ring-2 ring-green-700' : 'border-gray-300'}`}
        onClick={() => onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}
      >
        {checked && (
          <div className="absolute inset-0 m-auto w-3 h-3 bg-green-700 rounded-full"></div>
        )}
      </div>
    </div>
  );
};


const Gender: React.FC<GenderProps> = ({
  options = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ],
  defaultValue = 'male',
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-medium">Gender</h1>
      <div className="flex items-center mt-1">
        {options.map((option) => (
          <div className="flex mr-2" key={option.value}>
            <RadioButton
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleChange}
            />
            <label htmlFor={option.value} className="ml-1 block text-xl font-medium text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gender;
