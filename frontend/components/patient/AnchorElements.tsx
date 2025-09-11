'use client';
import { useEffect } from 'react';
import { Anchor } from 'antd';
import { PatientHook } from '../context/PatientProvider';
import { useMediaQuery } from 'react-responsive';

const items = [
    {
        key: 'Patient Information',
        href: '#Patient Information',
        title: <p className="dark:text-slate-50">Patient Information</p>,
    },
    {
        key: 'Appointments',
        href: '#Appointments',
        title: <p className="dark:text-slate-50">Appointments</p>,
    },

    {
        key: 'Medical History',
        href: '#Medical History',
        title: <p className="dark:text-slate-50">Medical History</p>,
    },
    {
        key: 'Invoices',
        href: '#Invoices',
        title: <p className="dark:text-slate-50">Invoices</p>,
    },
];

const AnchorElments = () => {
    const { activeLink, setActiveLink } = PatientHook();

    const isMobile = useMediaQuery({ query: '(min-width: 640px)' });

    useEffect(() => {
        setActiveLink('#Patient Information');
    }, []);

    return (
        <Anchor
            direction={`${isMobile ? 'horizontal' : 'vertical'}`}
            className="flex-1"
            getCurrentAnchor={() => activeLink} // Sets the default link
            onClick={(e, link) => setActiveLink(link.href)} // Updates when clicked
            items={items}
        />
    );
};

export default AnchorElments;
