import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import {
    AppointmentDocument,
    AppointmentInput,
    AppointmentModel,
} from '../models/appointment.model';
import { isBefore, isEqual, isSameDay } from 'date-fns';
import { checkReservedDates } from '@/interfaces/global.interface';
import { IsSameDayWithTimeZone } from '@/utils/backevents';

class AppointmentService {
    constructor(private appointmentModel = AppointmentModel) {}

    public createAppointment = async (input: AppointmentInput) => {
        return await this.appointmentModel.create(input);
    };

    public findOneAppointment = async (query: FilterQuery<AppointmentDocument>) => {
        return await this.appointmentModel.findOne(query);
    };

    public findUserAppointments = async (query: FilterQuery<AppointmentDocument>) => {
        return await this.appointmentModel.find(query);
    };

    public deleteAppointment = async (query: FilterQuery<AppointmentDocument>) => {
        return await this.appointmentModel.deleteOne(query);
    };

    public deleteMultipleAppointment = async (query: FilterQuery<AppointmentDocument>) => {
        return await this.appointmentModel.deleteMany(query);
    };
    public updateAppointment = async (
        query: FilterQuery<AppointmentDocument>,
        update: UpdateQuery<AppointmentDocument>,
        options?: QueryOptions
    ) => {
        return await this.appointmentModel.findByIdAndUpdate(query, update, options);
    };

    public checkReservedDates = async ({
        startDate,
        endDate,
    }: checkReservedDates): Promise<{ reservedDateState: boolean; message: string }> => {
        let reservedDateState = false;
        if (
            isBefore(endDate, startDate) ||
            isEqual(endDate, startDate) ||
            !IsSameDayWithTimeZone({ endDate, startDate })
        ) {
            reservedDateState = true;

            if (isBefore(endDate, startDate)) {
                return { reservedDateState, message: 'The end date is before the start date' };
            } else if (isEqual(endDate, startDate)) {
                return {
                    reservedDateState,
                    message: 'The start and end dates are the same',
                };
            } else if (!IsSameDayWithTimeZone({ endDate, startDate })) {

                return {
                    reservedDateState,
                    message: 'The Dates are not the on the same day',
                };
            }
        }

        return { reservedDateState, message: 'no reserved Dates' };
    };
}

export default AppointmentService;
