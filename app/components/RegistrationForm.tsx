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
    submittedData?: RegistrationFormData | null; // Corrected the type definition
}

const DetailsReview: React.FC<DetailsProps> = ({ submittedData }) => {
    const renderField = (label: string, value: string | undefined) => (
        <p>
            <strong>{label}:</strong> {value || 'N/A'}
        </p>
    );

    if (!submittedData) {
        return (
            <div>
                <h2>Review Your Details</h2>
                <p>No data available.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Review Your Details</h2>
            {renderField('First Name', submittedData.firstName)}
            {renderField('Middle Name', submittedData.middleName)}
            {renderField('Last Name', submittedData.lastName)}
            {renderField('Phone', submittedData.phone)}
            {renderField('Birth Date', submittedData.birthDate)}
            {renderField('Gender', submittedData.gender)}
            {renderField('Country', submittedData.country)}
            {renderField('District', submittedData.district)}
            {renderField('Municipality', submittedData.municipality)}
            {renderField('City', submittedData.city)}
            {renderField('Ward', submittedData.ward)}
        </div>
    );
};

export default DetailsReview;
