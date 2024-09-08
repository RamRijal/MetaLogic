/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

type MunicipalityProps = {
  name: string;
}
interface MunicipalityOptions {
  value: string;
  label: string;
}

interface Dropdown {
  value: string;
  onChange: (value: string) => void;
  options: MunicipalityOptions[];
  placeholder: string;
}
const Municipality = ({ name }: MunicipalityProps) => {
  const [municipality, setMunicipality] = useState<string>('');
  const municipalities: MunicipalityOptions[] = [
    { value: 'lalitpur', label: 'Lalitpur' },
    { value: 'kathmandu', label: 'Kathmandu' },
    { value: 'bhaktapur', label: 'Bhaktapur' },
    { value: 'nuwakot', label: 'Nuwakot' },
    { value: 'Chitwan', label: 'Chitwan' }
  ];

  const Dropdown = ({ value, onChange, options, placeholder }: Dropdown) => (
    <div className="flex flex-col  md:w-1/3 px-2 mb-4">
      <div className="relative w-48   ">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block p-3 py-3.5 px-5 border-2 border-gray-300 rounded-xl text-gray-400  text-md font-medium text-left mt-1  
          shadow-sm appearance-none w-full bg-white pr-8 leading-tight 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap -mx-2">
        <Dropdown
          value={municipality}
          onChange={setMunicipality}
          options={municipalities}
          placeholder="Eg: Lalitpur"
        />
      </div>
    </div>
  );
}

export default Municipality