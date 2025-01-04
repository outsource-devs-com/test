import React from 'react';
import { useSelector } from 'react-redux';

const FormTags = ({ step }) => {
    const answers = useSelector((state) => state.form.answers);
    const steps = [
        answers.module || 'Select Vehicle Control Module',
        answers.make || 'Select Make',
        answers.hardwareType || 'Select Hardware Type',
        answers.softwareServiceType || 'Select Software Service Type',
        'Upload File'
    ];
    console.log(answers);

    return (
        <div className="my-6  sm:px-7  flex justify-start items-center  z-10 bg-white">
            <p className="text-sm text-gray-500 text-center">
                {steps.slice(0, step - 1).join(' / ')}
                {step <= steps.length && (
                    <>
                        {step > 1 && ' / '}
                        <span className="font-bold text-black">
                            {steps[step - 1]}
                        </span>
                    </>
                )}
            </p>
        </div>
    );
};

export default FormTags;
