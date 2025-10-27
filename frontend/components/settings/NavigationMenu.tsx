'use client';

import { AccountSettingMenuItems } from '@/lib/constants';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface singleLinkItemProps {
    item: {
        title: string;
        url: string;
        private?: boolean;
    };
}

const SingleLinkItem = ({ item }: singleLinkItemProps) => {
    const pathname = usePathname();

    return (
        <Link
            href={item.url}
            key={item.title}
            className=" px-4 first-of-type:px-0 "
        >
            <li
                className={clsx(
                    'text-sm font-medium text-slate-800 dark:text-slate-50 capitalize transition-transform',
                    {
                        'border-b-2 border-b-blue-800 !text-blue-800': pathname === item.url,
                    }
                )}
            >
                {item.title}
            </li>
        </Link>
    );
};
const NavigationMenu = () => {
    const { data: session } = useSession();
    return (
        <div className="flex justify-center items-start">
            <ul className="flex list-inside justify-center items-start">
                {AccountSettingMenuItems.map(item => {
                    if (item.private) {
                        if (session?.user.role === 'Admin')
                            return (
                                <SingleLinkItem
                                    key={item.title}
                                    item={item}
                                />
                            );
                    } else {
                        return (
                            <SingleLinkItem
                                key={item.title}
                                item={item}
                            />
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default NavigationMenu;
