import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import {
    AppointmentDocument,
    AppointmentInput,
    AppointmentModel,
} from '../models/appointment.model';

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

    public updateAppointment = async (
        query: FilterQuery<AppointmentDocument>,
        update: UpdateQuery<AppointmentDocument>,
        options?: QueryOptions
    ) => {
        return await this.appointmentModel.findByIdAndUpdate(query, update, options);
    };
}

export default AppointmentService;
