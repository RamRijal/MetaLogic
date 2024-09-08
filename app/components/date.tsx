'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type DateProps = {
  register: (name: string) => void;
  errors: Record<string, any>;
}

const schema = z.object({
  birthDate: z.string().min(1, 'Birth date is required'),
});

interface FormData {
  birthDate: string;
}

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
      {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
    </div>
  );
}

export default Date;
