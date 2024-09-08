import React from 'react';

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

interface DetailsProps {
    submittedData?: <RegistrationFormData | null>
}

const DetailsReview: React.FC<DetailsProps> = ({ submittedData }) => {
    const renderField = (label: string, value: string | undefined) => (
        <li>
            <strong>{label}:</strong> {value || 'N/A'}
        </li>
    );

    if (!submittedData) {
        return (
            <div className="bg-white bg-opacity-90 rounded-lg border-2 border-gray-400 max-w-4xl mx-auto p-8">
                <h2 className="text-4xl font-bold mb-6">Review Your Details</h2>
                <p>No data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white bg-opacity-90 rounded-lg border-2 border-gray-400 max-w-4xl mx-auto p-8">
            <h2 className="text-4xl font-bold mb-6">Review Your Details</h2>
            <ul className="space-y-4">
                {renderField('First Name', submittedData.firstName)}
                {renderField('Middle Name', submittedData.middleName)}
                {renderField('Last Name', submittedData.lastName)}
                {renderField('Phone', submittedData.phone)}
                {renderField('Birth Date', submittedData.birthDate)}
                {renderField('Gender', submittedData.gender)}
            </ul>
        </div>
    );
};

export default DetailsReview;
