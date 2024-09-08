'use client';

import Image from 'next/image';
import React from 'react';
import hat from '../assets/Vector.png'; // Import the hat image

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center justify-center mt-2 mb-8">
      <div className="w-2/5 h-2 bg-gray-300 rounded-full mb-5 relative">
        {/* Animated progress bar */}
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-1200 ease-out"
          style={{ width: `${progress}%` }}
        />

        {/* Step indicators */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between items-center">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* Only show the hat image above the current step */}
              {i === currentStep - 1 && (
                <div className="absolute -top-10 w-12 h-12">
                  <Image src={hat} alt="Hat" layout="fill" objectFit="contain"   />
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${i < currentStep ? 'bg-green-500 text-white' : 'bg-white border-2 border-green-500 text-green-500'
                  }`}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
