import React from 'react';
import dynamic from 'next/dynamic';

const Setting = dynamic(() => import('@/components/settings/settings/settingLayout'));
const page = () => {
    return <Setting />;
};

export default page;
