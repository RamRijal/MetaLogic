import Image from 'next/image';
import React, { useState } from 'react';

type ImageInputProps = {
    name: string;
    onUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageInput = ({ name, onUpload }: ImageInputProps) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isInputVisible, setIsInputVisible] = useState(true);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsInputVisible(false);
            setUploadedFile(file);
            if (onUpload) {
                onUpload(e);
            }
        }
    };
    const handleClick = () => {
        const mockEvent = new Event('change', { bubbles: true });
        const mockInput = document.createElement('input');
        mockInput.type = 'file';
        mockInput.accept = '.jpg,.jpeg,.png';

        mockInput.dispatchEvent(mockEvent);
        handleFileChange({ target: mockInput } as React.ChangeEvent<HTMLInputElement>);
    };


    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`flex flex-col items-center justify-center ${isInputVisible ? '' : 'hidden'}`}>
                <input
                    type="file"
                    name={name}
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="w-64 h-32 border-dashed border-2 border-gray-300 cursor-pointer"
                />
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
                {uploadedFile && (
                    <Image
                        src={URL.createObjectURL(uploadedFile)}
                        alt={`${name} preview`}
                        className="w-64 h-64 object-cover rounded-sm mb-12"
                        width={150}
                        height={150}
                    />
                )}
            </div>

            <button
                onClick={handleClick}
                type="button"
                className="w-52 py-3 px-4 bg-[#4DAF4E] text-white text-lg font-bold rounded-md shadow hover:bg-[#43056C] focus:outline-none transition-all duration-1000 ease-out"
            >
                Upload your picture
            </button>
        </div>
    );
};

export default ImageInput;
