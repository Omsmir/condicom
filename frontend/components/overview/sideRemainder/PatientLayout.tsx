'use client';
import React from 'react';
import SinglePatient from './SinglePatient';

const PatientLayout = () => {
    return (
        <div className="flex flex-col items-start justify-start px-4 space-y-4 max-h-[500px] overflow-y-scroll">
            {[...Array(5)].map((_, index) => (
                <SinglePatient key={index} />
            ))}
        </div>
    );
};

export default PatientLayout;
