'use client'

import React from 'react';

interface GenderOption {
  value: string;
  label: string;
}

interface GenderProps {
  options?: GenderOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Gender: React.FC<GenderProps> = ({
  options = [{ value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },],
  defaultValue = 'male',
  onChange,
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <>
        <h1 className='text-2xl font-medium'>Gender</h1>
        <div>
        {options.map((option) => (
          < label className='text-xl p-2  font-medium ' key={option.value} >
            <input
              type="radio"
              name="gender"
              value={option.value}
              checked={defaultValue === option.value}
              onChange={handleChange}
            />
            {" "}{option.label}
          </label>
        ))}
      </div>
      
    </>
  );
};

export default Gender;

