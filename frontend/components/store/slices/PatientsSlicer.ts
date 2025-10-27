import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface InitialPatientTableState {
    pageIndex: number;
    pageSize: number;
    totalPages:number;
}

const initialPatientTableState: InitialPatientTableState = {
    pageIndex: 0,
    pageSize: 15,
    totalPages:1
};

const patientTableSlicer = createSlice({
    initialState: initialPatientTableState,
    name: 'pagination',
    reducers: {
        setPageIndex: (state, action: PayloadAction<number>) => {
            state.pageIndex = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload
        },
        setTotalPages:(state,action:PayloadAction<number>) => {
            state.totalPages = action.payload
        }
    },
});


export const getIsPerviousEnabled = (state:RootState) :boolean => {
    const {pageIndex} = state.pagination
    if(pageIndex == 0) return false
    return true
}

export const getIsNextEnabled = (state:RootState):boolean => {
    const {pageIndex,totalPages,pageSize} = state.pagination

    const totalPagesForDocs = Math.ceil(totalPages / pageSize)

    if(pageIndex+1 >= totalPagesForDocs) return false
    return true
}

export const {setPageIndex,setPageSize,setTotalPages} = patientTableSlicer.actions

export default patientTableSlicer.reducer