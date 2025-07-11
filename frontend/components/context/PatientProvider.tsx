'use client';
import { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from 'react';

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
}

const PatientContext = createContext<PatientContextProps | null>(null);

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [activeLink, setActiveLink] = useState('#Patient Information');
    const [alertMessage, setAlertMessage] = useState<number | undefined>();
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
