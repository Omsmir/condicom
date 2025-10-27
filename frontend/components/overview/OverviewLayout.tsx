'use client';
import React from 'react';
import UpperStats from './UpperStats';
import ChartsLayout from './ChartsLayout';
import SideLayout from './SideLayout';

const OverviewLayout = () => {
    return (
        <div className="grid grid-cols-12 w-full">
            <UpperStats />

            <ChartsLayout />
            <SideLayout />
        </div>
    );
};

export default OverviewLayout;
