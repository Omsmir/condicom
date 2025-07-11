'use client';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, useSidebar } from '@/components/ui/sidebar';
import CollapsibleItems, { ItemProps } from './sidebar/Collapsible';
import NotCollapsible from './sidebar/NotCollapsible';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';
import clsx from 'clsx';

export interface itemProps {
    items: {
        title: string;
        url: string;
        icon?: any;
        private?: boolean;
        isActive?: boolean;
        sideItemTitle?: string;
        sideItemState?: boolean;
        group: boolean;
        items?: {
            title: string;
            url: string;
            viewport?: number;
            private?: boolean;
        }[];
    }[];
}
interface checkSidebarTitleExistanceProps {
    sideItemTitle: string | undefined;
    sideItemState: boolean | undefined;

    children?: React.ReactNode;
}
const CheckSidebarTitleExistance = ({
    sideItemTitle,
    sideItemState,
    children,
}: checkSidebarTitleExistanceProps) => {
    const { open } = useSidebar();

    switch (sideItemState) {
        case true:
            return (
                <Fragment key={sideItemTitle}>
                    <SidebarGroupLabel
                        className={clsx('flex text-slate-500 capitalize w-full whitespace-nowrap', {
                            hidden: !open,
                        })}
                    >
                        {sideItemTitle}
                    </SidebarGroupLabel>
                    {children}
                </Fragment>
            );
        default:
            return children;
    }
};
export function NavMain({ items }: itemProps) {
    const { data: session } = useSession();
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map(item => {
                    if (item.group) {
                        if (item.private) {
                            if (session?.user.role === 'Admin')
                                return (
                                    <CollapsibleItems
                                        item={item}
                                        key={item.title}
                                    />
                                );
                        } else {
                            return (
                                <CheckSidebarTitleExistance
                                    key={item.title}
                                    sideItemTitle={item.sideItemTitle}
                                    sideItemState={item.sideItemState}
                                >
                                    <CollapsibleItems item={item} />{' '}
                                </CheckSidebarTitleExistance>
                            );
                        }
                    } else {
                        if (item.private) {
                            if (session?.user.role === 'Admin')
                                return (
                                    <NotCollapsible
                                        item={item}
                                        key={item.title}
                                    />
                                );
                        } else {
                            return (
                                <CheckSidebarTitleExistance
                                    key={item.title}
                                    sideItemTitle={item.sideItemTitle}
                                    sideItemState={item.sideItemState}
                                >
                                    <NotCollapsible item={item} />
                                </CheckSidebarTitleExistance>
                            );
                        }
                    }
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
