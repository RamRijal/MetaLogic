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

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import Date from './date';
import District from './district';
import Gender from './gender';
import ImageInput from './imageInput';
import Municipality from './municipality';
import ProgressBar from './progressBar';
import Country from './province';
import { useRouter } from 'next/navigation';


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
    country: string;
    district: string;
    municipality: string;
    city: string;
    ward: string;
}

const RegistrationForm = () => {
    const [step, setStep] = useState(1)
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const router = useRouter();

    const nextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        }
        else {
            router.push('/review-details');
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };
    const methods = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = (data: FormData) => {
        setSubmittedData(data); // Store submitted data
        nextStep() // Go to the final review page
    };



    if (step === 5 && submittedData) {
        return (
            <div className=" bg-white bg-opacity-90 rounded-lg border-2 border-gray-400 max-w-4xl mx-auto p-8">
                <h2 className="text-4xl font-bold mb-6">Review Your Details</h2>
                <ul className="space-y-4">
                    <li><strong>First Name:</strong> {submittedData.firstName}</li>
                    <li><strong>Middle Name:</strong> {submittedData.middleName || 'N/A'}</li>
                    <li><strong>Last Name:</strong> {submittedData.lastName}</li>
                    <li><strong>Phone:</strong> {submittedData.phone}</li>
                    <li><strong>Birth Date:</strong> {submittedData.birthDate}</li>
                    <li><strong>Gender:</strong> {submittedData.gender}</li>
                </ul>
                <button
                    onClick={() => setStep(1)}
                    className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700"
                >
                    Go Back to Edit
                </button>
            </div>
        );
    }
    return (
        <FormProvider {...methods.register}>
            <ProgressBar currentStep={0} totalSteps={4} />
            <div className=" bg-white bg-opacity-90 rounded-lg border-2 border-gray-400 max-w-4xl  mx-auto ">
                <form onSubmit={methods.handleSubmit(handleSubmit)} className='px-10 py-5'>
                    {step === 1 &&
                        (
                            <>
                                <h2 className="text-4xl font-bold mb-10">Personal Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="firstName" className="block text-2xl font-medium text-gray-700">
                                            First Name
                                        </label>

                                        <input
                                            {...methods.register('firstName')}
                                            id="firstName"
                                            className={`p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-medium text-left mt-1 block w-full shadow-sm ${methods.formState.errors.firstName ? 'border-red-500' : ''
                                                }`}
                                            placeholder="Enter Your First Name"
                                        />
                                        {methods.formState.errors.firstName && <p className="text-red-500 text-sm">{methods.formState.errors.firstName.message}</p>}
                                    </div>

                                    {/* Middle Name */}
                                    <div>
                                        <label htmlFor="middleName" className="block text-2xl font-medium text-gray-700">
                                            Middle Name
                                        </label>
                                        <input
                                            {...methods.register('middleName')}
                                            id="middleName"
                                            className={`p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-medium text-left mt-1 block w-full shadow-sm ${methods.formState.errors.middleName ? 'border-red-500' : ''
                                                }`} placeholder="Enter Your Middle Name"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="lastName" className="block text-2xl font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <input
                                            {...methods.register('lastName')}
                                            id="lastName"
                                            className={`p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-medium text-left mt-1 block w-full shadow-sm ${methods.formState.errors.lastName ? 'border-red-500' : ''
                                                }`}
                                            placeholder="Enter Your Last Name"
                                        />
                                        {methods.formState.errors.lastName && <p className="text-red-500 text-sm">{methods.formState.errors.lastName.message}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-2xl font-medium text-gray-700">
                                            Phone
                                        </label>
                                        <input
                                            {...methods.register('phone')}
                                            id="phone"
                                            className={`p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-medium text-left mt-1 block w-full shadow-sm ${methods.formState.errors.phone ? 'border-red-500' : ''
                                                }`}
                                            placeholder="98xxxxxxxx"
                                        />
                                        {methods.formState.errors.phone && <p className="text-red-500 text-sm">{methods.formState.errors.phone.message}</p>}
                                    </div>

                                    {/* Birth Date */}
                                    <Date register={methods.register} errors={methods.formState.errors} />

                                    <div></div>
                                    {/* Gender */}
                                    <div> <Gender /></div>
                                </div>
                                {/* Submit Button */}
                                <div className="flex justify-end col-span-2 mt-12">
                                    <button
                                        onClick={nextStep}
                                        type="button"
                                        className=" w-36 py-2 px-3 bg-[#4DAF4E] text-white text-lg  font-bold rounded-md shadow hover:bg-[#43056C] focus:outline-none transition-all duration-1000 ease-out"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    {step === 2 && (
                        <>
                            <h2 className="text-4xl font-bold mb-10">Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Country */}
                                <div>
                                    <label htmlFor="country" className="block text-2xl font-medium text-gray-700">
                                        Country                                    </label>

                                    <Country name="country" />
                                </div>
                                {/* District */}
                                <div>
                                    <label htmlFor="district" className="block text-2xl font-medium text-gray-700">
                                        District                                    </label>

                                    <District name="district" />
                                </div>
                                {/* Municipality */}
                                <div>
                                    <label htmlFor="municipality" className="block text-2xl font-medium text-gray-700">
                                        Municipality/Local                                    </label>
                                    <Municipality name="municipality" />
                                </div>

                                {/* CITY */}
                                <div>
                                    <label htmlFor="city" className="block text-2xl font-medium text-gray-700">
                                        City                                </label>

                                    <input
                                        {...methods.register('city')}
                                        id="city"
                                        className={`p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-medium text-left mt-1 block w-full shadow-sm ${methods.formState.errors.city ? 'border-red-500' : ''
                                            }`}
                                        placeholder="Eg: Kathmandu"
                                    />
                                    {methods.formState.errors.city && <p className="text-red-500 text-sm">{methods.formState.errors.city.message}</p>}
                                </div>
                                {/* Ward */}
                                <div>
                                    <label htmlFor="ward" className="block text-2xl font-medium text-gray-700">
                                        Ward </label>

                                    <input
                                        {...methods.register('ward')}
                                        id="ward"
                                        className={`p-3 px-5 border-2 border-gray-300 rounded-xl text-md font-medium text-left mt-1 block w-full shadow-sm ${methods.formState.errors.ward ? 'border-red-500' : ''
                                            }`}
                                        placeholder="Eg: 4"
                                    />
                                    {methods.formState.errors.ward && <p className="text-red-500 text-sm">{methods.formState.errors.ward.message}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end col-span-2 mt-12 gap-4">
                                <button onClick={prevStep} type="button"
                                    className=" w-36 py-2 px-3 bg-[#688968] text-white text-lg  font-bold rounded-md shadow hover:bg-[#43056C] focus:outline-none transition-all duration-1000 ease-out"
                                >Back</button>
                                <button
                                    onClick={nextStep}
                                    type="button"
                                    className=" w-36 py-2 px-3 bg-[#4DAF4E] text-white text-lg  font-bold rounded-md shadow hover:bg-[#43056C] focus:outline-none transition-all duration-1000 ease-out"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <h2>Set Your Profile Picture</h2>
                            <ImageInput name="profilePicture" />
                            <div className="flex justify-end col-span-2 mt-12 gap-4">
                                <button onClick={prevStep} type="button"
                                    className=" w-36 py-2 px-3 bg-[#688968] text-white text-lg  font-bold rounded-md shadow hover:bg-[#43056C] focus:outline-none transition-all duration-1000 ease-out"
                                >Back</button>
                                <button
                                    onClick={nextStep}
                                    type="button"
                                    className=" w-36 py-2 px-3 bg-[#4DAF4E] text-white text-lg  font-bold rounded-md shadow hover:bg-[#43056C] focus:outline-none transition-all duration-1000 ease-out"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                    {step === 4 && (
                        <>
                            <h2>Review Your Details</h2>
                            {/* Display all entered information here */}
                            <div className="flex justify-end col-span-2 mt-12 gap-4">
                                <button onClick={prevStep} type="button"
                                    className=" w-36 py-2 px-3 bg-[#688968] text-white text-lg  font-bold rounded-md shadow hover:bg-[#43056C] focus:outline-none transition-all duration-1000 ease-out"
                                >Back</button>
                                <button
                                    onClick={nextStep}
                                    type="button"
                                    className=" w-36 py-2 px-3 bg-[#4DAF4E] text-white text-lg  font-bold rounded-md shadow hover:bg-[#43056C] focus:outline-none transition-all duration-1000 ease-out"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                </form>
            </div>
        </FormProvider >
    )
}

export default RegistrationForm;
