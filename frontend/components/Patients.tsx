'use client';
import { DataTable } from './table/Table';
import { patientsColumns } from './table/PatientsColumns';
import { AccessibleForward } from '@mui/icons-material';
import { UsePatientQuery } from '@/actions/queries';
import Loading from '@/app/loading';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setTotalPages } from './store/slices/PatientsSlicer';

const Patients = () => {
    const dispatch = useAppDispatch();
    const { pageIndex, pageSize } = useAppSelector(state => state.pagination);
    const filters = [
        {
            columnId: 'gender',
            value: 'Male',
        },
        {
            columnId:"firstName",
            value:"omar"
        }
    ];

    const { data, isLoading, isError, error } = UsePatientQuery({ pageIndex, pageSize ,filters});

    if (isLoading) return <Loading />;
    if (isError) {
        return (
            <DataTable
                columns={patientsColumns}
                data={[]}
                StatsIcon={<AccessibleForward />}
                renderSwitchState="patient"
                breadCrumbString="patients"
                message={error.message}
                totalPages={1}
            />
        );
    }

    if (data) {
        return (
            <DataTable
                columns={patientsColumns}
                data={data.patients}
                totalPages={data.totalPages}
                renderSwitchState="patient"
                breadCrumbString="patients"
                StatsIcon={<AccessibleForward />}
            />
        );
    }
};

export default Patients;
