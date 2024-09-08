'use client';

import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-5 bg-gray-200 rounded-full mb-5 relative">
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
      <div className="bg-{#43056C} absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${i < currentStep ? 'bg-green-500 text-white' : 'bg-white border-2 border-green-500 text-green-500'
              }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;