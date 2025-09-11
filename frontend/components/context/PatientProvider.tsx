'use client';
import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction, useMemo } from 'react';

import { createContext, useContext, useState } from 'react';

interface PatientContextProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    activeLink: string;
    setActiveLink: Dispatch<SetStateAction<string>>;
    setAlertMessage: Dispatch<SetStateAction<number | undefined>>;
    alertMessage: number | undefined;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    pageIndex: number;
    setPageIndex: Dispatch<SetStateAction<number>>;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    totalPages: number;
    setTotalPages: Dispatch<SetStateAction<number>>;
}

const PatientContext = createContext<PatientContextProps | null>(null);

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [activeLink, setActiveLink] = useState('#Patient Information');
    const [alertMessage, setAlertMessage] = useState<number | undefined>();
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(15);
    const [totalPages, setTotalPages] = useState<number>(0);
    // Tables

    return (
        <PatientContext.Provider
            value={{
                loading,
                setLoading,
                activeLink,
                setActiveLink,
                alertMessage,
                setAlertMessage,
                setIsLoading,
                isLoading,
                pageIndex,
                setPageIndex,
                pageSize,
                setPageSize,
                totalPages,
                setTotalPages,
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};

export const PatientHook = () => {
    const Context = useContext(PatientContext);
    if (!Context) {
        throw new Error('Patient Context Must Be within the PatientHook');
    }

    return Context;
};
