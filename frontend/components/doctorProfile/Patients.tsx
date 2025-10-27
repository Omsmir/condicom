'use client';
import { Divider } from '@mui/material';
import { UsePatientQuery } from '@/actions/queries';
import SinglePatient from './SinglePatient';
import Spinner from '../Spinner';

const Patients = () => {
    const { data, isFetching, isError, error } = UsePatientQuery();

    const patients = data?.Patients;

    return (
        <div className="flex flex-1 flex-col bg-[var(--sidebar-background)] rounded-md sm:min-w-[386px] my-4">
            <div className="flex p-4 items-center">
                <h1 className="dark:text-slate-500 font-medium">Patients</h1>
            </div>
            <Divider className=" dark:bg-slate-500 m-0" />
            <div className="flex flex-col min-h-[175px] max-h-[275px] overflow-y-scroll">
                {isFetching ? (
                    <Spinner
                        className="relative"
                        size="small"
                    />
                ) : data && patients && patients.length > 0 ? (
                    patients.map(patient => (
                        <SinglePatient
                            patient={patient}
                            key={patient.id}
                        />
                    )).splice(0,10)
                ) : isError ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <p className="text-slate-600 text-sm font-medium capitalize">
                            {error.message}
                        </p>
                    </div>
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <p className="text-slate-600 text-sm font-medium capitalize">no patients</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Patients;
