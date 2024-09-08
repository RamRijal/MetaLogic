/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Image from 'next/image';
import Pic from '../assets/Screenshot 2024-06-28 183729.png'
import DetailsReview from '../detailsReview/page'

const schema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(1, 'Last Name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    birthDate: z.string().min(1, 'Birth date is required'),
    gender: z.enum(['Male', 'Female', 'Others']),
});


interface RegistrationFormData {
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
    const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null);
    const router = useRouter();

    const nextStep = () => {
        if (step < 4) {
            setStep(step + 1);
        }
        else {
            router.push('/detailsReview');
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const methods = useForm<RegistrationFormData>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = (data: RegistrationFormData) => {
        setSubmittedData(data || {}); // Store submitted data
        nextStep() // Go to the final review page
    };




    return (
        <FormProvider {...methods}>
            <ProgressBar currentStep={step} totalSteps={4} />
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
                            <h2 className=" flex justify-center text-4xl font-bold mb-10">Set Your Profile Picture</h2>
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

                            <h2 className=" flex justify-center text-4xl font-bold mb-10">Review Your Details</h2>
                            {/* Display all entered information here */}
                            <Image loading='lazy' alt='asd' src={Pic} width={200} height={200} />
                            <h2 className=" flex justify-left text-3xl font-bold py-5">Personal Details</h2>
                            {submittedData ?
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                                    <h1 className=" flex justify-left text-2xl font-bold mb-1">First Name: </h1>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">{submittedData.firstName}</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">Last Name:</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">{submittedData.lastName}</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">Middle Name:</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">{submittedData.middleName}</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">Phone:</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">{submittedData.phone}</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">BirthDate:</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">{submittedData.birthDate}</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">Gender:</h2>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">{submittedData.gender}</h2>
                                </div>
                                : ""}
                            <h2 className=" flex justify-left text-3xl font-bold py-5">Address</h2>
                            {submittedData ?
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">Country:</h2>
                                    {/* <h2 className=" flex justify-left text-2xl font-bold mb-1">{firstName}</h2> */}
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">District:</h2>
                                    {/* <h2 className=" flex justify-left text-2xl font-bold mb-1">{lastName}</h2> */}
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">Municipality:</h2>
                                    {/* <h2 className=" flex justify-left text-2xl font-bold mb-1">{middleName}</h2> */}
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">City:</h2>
                                    {/* <h2 className=" flex justify-left text-2xl font-bold mb-1">{phone}</h2> */}
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">Ward:</h2>
                                    {/* <h2 className=" flex justify-left text-2xl font-bold mb-1">{birthDate}</h2> */}
                                    <h2 className=" flex justify-left text-2xl font-bold mb-1">Gender</h2>
                                    {/* <h2 className=" flex justify-left text-2xl font-bold mb-1">{gender}</h2> */}
                                </div>
                                : ""}
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
                    {
                        step === 5 &&
                        <>
                            nextStep()
                            <DetailsReview />
                        </>}
                </form>
            </div>
        </FormProvider >
    )
}

export default RegistrationForm;
