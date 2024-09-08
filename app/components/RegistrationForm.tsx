// 'use client';

// import React, { useState } from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
// import validationSchema from '../utils/ValidationSchema';
// import FormData from '../utils/ValidationSchema';
// import ImageInput from './imageInput'
// import Province from './province'
// import District from './district'
// import Municipality from './municipality'
// import Gender from './gender'
// import Date from './date'
// import ProgressBar from './progressBar'

// const RegistrationForm: React.FC = () => {
//     const [step, setStep] = useState(1);
//     const router = useRouter();
//     const methods = useForm<FormData>({
//         resolver: zodResolver(validationSchema),
//     });

//     const onSubmit = (data: FormData) => {
//         console.log(data);
//         // Handle form submission
//     };

//     const nextStep = () => {
//         if (step < 4) {
//             setStep(step + 1);
//         } else {
//             router.push('/review-details');
//         }
//     };

//     const prevStep = () => {
//         if (step > 1) {
//             setStep(step - 1);
//         } else {
//             router.push('/');
//         }
//     };

//     return (
//         <FormProvider {...methods}>
//             <form onSubmit={methods.handleSubmit(onSubmit)}>
//                 <ProgressBar currentStep={step} totalSteps={4} />
//                 {step === 1 && (
//                     <>
//                         <div className='bg-slate-200 w-3/4 flex flex-col justify-center items-center '>
//                             <h2 className='text-3xl font-medium'>Personal Details</h2>
//                             <div className='flex m-2 gap-4'>
//                                 <input className='p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-normal text-left' type='text' {...methods.register('firstName')} placeholder="Enter Your First Name" />
//                                 <input className='p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-normal text-left' type='text' {...methods.register('middleName')} placeholder="Enter Your Middle Name" />
//                                 <input className='p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-normal text-left' type='text' {...methods.register('lastName')} placeholder="Enter Your Last Name" />
//                             </div>
//                             <div className='flex m-2'>
//                                 <input className='p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-normal text-left' type='number' {...methods.register('phone')} placeholder="Phone" />
//                                 <Date name="birthDate" />
//                             </div>
//                             <Gender name="gender" />
//                             <div >
//                                 <button className='bg-green-500 px-8 text-center text-white text-lg py-2 rounded-md' onClick={nextStep}>Next</button>
//                             </div>
//                         </div>
//                     </>
//                 )}
//                 {step === 2 && (
//                     <>
//                         <h2>Address</h2>
//                         <Province name="province" />
//                         <District name="district" />
//                         <Municipality name="municipality" />
//                         <input {...methods.register('city')} placeholder="City" />
//                         <input {...methods.register('ward')} placeholder="Ward" />
//                         <button onClick={prevStep}>Back</button>
//                         <button onClick={nextStep}>Next</button>
//                     </>
//                 )}
//                 {step === 3 && (
//                     <>
//                         <h2>Set Your Profile Picture</h2>
//                         <ImageInput name="profilePicture" />
//                         <button onClick={prevStep}>Back</button>
//                         <button onClick={nextStep}>Next</button>
//                     </>
//                 )}
//                 {step === 4 && (
//                     <>
//                         <h2>Review Your Details</h2>
//                         {/* Display all entered information here */}
//                         <button onClick={prevStep}>Back</button>
//                         <button type="submit">Submit</button>
//                     </>
//                 )}
//             </form>
//         </FormProvider>
//     );
// };

// export default RegistrationForm;

'use client'

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last Name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    birthDate: z.string().min(1, 'Birth date is required'),
    gender: z.enum(['Male', 'Female', 'Others']),
});

interface FormData {
    firstName: string;
    middleName?: string;
    lastName: string;
    phone: string;
    birthDate: string;
    gender: 'Male' | 'Female' | 'Others';
}

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>({ resolver: zodResolver(schema), });
    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <FormProvider {...register}>
            <div className="max-w-4xl mx-auto p-8">
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white-300 bg-opacity-35 p-12'>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                {...register('firstName')}
                                id="firstName"
                                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors.firstName ? 'border-red-500' : ''
                                    }`}
                                placeholder="Enter Your First Name"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                        </div>

                        {/* Middle Name */}
                        <div>
                            <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
                                Middle Name
                            </label>
                            <input
                                {...register('middleName')}
                                id="middleName"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter Your Middle Name"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                {...register('lastName')}
                                id="lastName"
                                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors.lastName ? 'border-red-500' : ''
                                    }`}
                                placeholder="Enter Your Last Name"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <input
                                {...register('phone')}
                                id="phone"
                                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors.phone ? 'border-red-500' : ''
                                    }`}
                                placeholder="98xxxxxxxx"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>

                        {/* Birth Date */}
                        <div>
                            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                                Birth Date
                            </label>
                            <input
                                {...register('birthDate')}
                                id="birthDate"
                                type="date"
                                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm ${errors.birthDate ? 'border-red-500' : ''
                                    }`}
                            />
                            {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
                        </div>
                        <div></div>
                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <div className="flex items-center mt-1">
                                <div className="flex items-center mr-4">
                                    <input
                                        {...register('gender')}
                                        type="radio"
                                        value="Male"
                                        id="male"
                                        className="h-4 w-4 border-gray-300"
                                    />
                                    <label htmlFor="male" className="ml-2 block text-sm text-gray-700">
                                        Male
                                    </label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input
                                        {...register('gender')}
                                        type="radio"
                                        value="Female"
                                        id="female"
                                        className="h-4 w-4 border-gray-300"
                                    />
                                    <label htmlFor="female" className="ml-2 block text-sm text-gray-700">
                                        Female
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        {...register('gender')}
                                        type="radio"
                                        value="Others"
                                        id="others"
                                        className="h-4 w-4 border-gray-300"
                                    />
                                    <label htmlFor="others" className="ml-2 block text-sm text-gray-700">
                                        Others
                                    </label>
                                </div>
                            </div>
                            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="col-span-2 mt-12">
                        <button
                            type="submit"
                            className="w-40 py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default RegistrationForm;
