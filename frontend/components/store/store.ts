import { persistReducer } from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import patientPaginationSlicer from './slices/PatientsSlicer';
import storage from './storage';

const persistConfig = {
    key: 'root',
    storage,
};

const reducers = combineReducers({
    pagination: patientPaginationSlicer,
});

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
