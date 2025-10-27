'use client';
import { UserInformation } from '@/types';
import React from 'react';
import AccountReusebleHeader from '../ReusebleHeader';
import { Divider } from 'antd';
import ContactInfo from './ContactInfo';

const Contact = ({
    user,
    isFetching,
}: {
    user: UserInformation | undefined;
    isFetching: boolean;
}) => {
    return (
        <div className="flex flex-col justify-center items-start col-span-12 bg-[var(--sidebar-background)] rounded-md shadow-md shadow-slate-300 dark:shadow-slate-800 mt-6">
            <AccountReusebleHeader innerText="Contact & Role" />
            <Divider className=" dark:bg-slate-500 m-0 w-full" />

            <ContactInfo
                user={user}
                isFetching={isFetching}
            />
        </div>
    );
};

export default Contact;
