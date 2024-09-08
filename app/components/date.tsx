import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface RegistrationFormData {
  birthDate: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Others';
  country: string;
  district: string;
  municipality: string;
  city: string;
  ward: string;
}

type DateProps = {
  register: UseFormRegister<RegistrationFormData>;
  errors: {
    birthDate?: {
      message?: string;
    };
  };
};

const Date = ({ register, errors }: DateProps) => {
  return (
    <div>
      <label htmlFor="birthDate" className="block text-2xl font-medium text-gray-700">
        Birth Date
      </label>
      <input
        {...register('birthDate')}
        id="birthDate"
        type="date"
        className={`p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-medium text-left mt-1 block w-full shadow-sm ${errors.birthDate ? 'border-red-500' : ''
          }`}
        placeholder="Select Your Birth Date"
      />
      {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
    </div>
  );
};

export default Date;
