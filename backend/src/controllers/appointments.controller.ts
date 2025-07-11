import { Response, Request } from 'express';
import {
    AppointmentParamInterface,
    AppointmentSchemaInterface,
    AppointmentUpdateInterface,
} from '../schemas/appointment.schema';
import AppointmentService from '../services/appointments.service';
import { isBefore, isEqual, isSameDay } from 'date-fns';
import UserService from '../services/user.service';
import { BaseController } from './base.controller';
import HttpException from '@/exceptions/httpException';

class AppointmentController extends BaseController {
    private appointmentService: AppointmentService;
    private userService: UserService;
    constructor() {
        super();
        this.appointmentService = new AppointmentService();
        this.userService = new UserService();
    }
    public createAppointmentHandler = async (
        req: Request<{}, {}, AppointmentSchemaInterface['body']>,
        res: Response
    ) => {
        try {
            const userId = req.body.userId;

            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const reservedDates = await this.appointmentService.findUserAppointments({
                user: userId,
                $or: [
                    {
                        // Case 1: New startDate falls within an existing range
                        startDate: { $lt: startDate },
                        endDate: { $gt: startDate },
                    },
                    {
                        // Case 2: New endDate falls within an existing range
                        startDate: { $lt: endDate },
                        endDate: { $gt: endDate },
                    },
                    {
                        // Case 3: The new range entirely overlaps an existing range
                        startDate: { $gte: startDate },
                        endDate: { $lte: endDate },
                    },
                ],
            });

            const reservedFrontDates = () => {
                let datesArrayState = false;
                if (
                    isBefore(endDate, startDate) ||
                    isEqual(endDate, startDate) ||
                    !isSameDay(endDate, startDate)
                ) {
                    datesArrayState = true;
                    if (isBefore(endDate, startDate)) {
                        return {
                            datesArrayState,
                            msg: 'The end date is before the start date',
                        };
                    }

                    if (isEqual(startDate, endDate)) {
                        return {
                            datesArrayState,
                            msg: 'The start and end dates are the same',
                        };
                    }
                    if (!isSameDay(endDate, startDate)) {
                        return {
                            datesArrayState,
                            msg: 'The Dates are not the on the same day',
                        };
                    }
                }

                return { datesArrayState };
            };

            if (reservedFrontDates().datesArrayState) {
                throw new HttpException(400, reservedFrontDates().msg as string);
            }

            if (reservedDates.length > 0) {
                throw new HttpException(400, 'The new task conflicts with existing appointments.');
            }

            const newAppointment = await this.appointmentService.createAppointment({
                user: userId,
                ...req.body,
            });

            res.status(201).json({
                message: 'Appointment created successfully',
                appointment: newAppointment,
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public getUserAppointments = async (
        req: Request<AppointmentParamInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const user = await this.userService.findUser({ _id: id });
            if (!id || !user) {
                throw new HttpException(404, "user doesn't exist");
            }

            const userAppointments = await this.appointmentService.findUserAppointments({
                user: id,
            });

            if (!userAppointments) {
                throw new HttpException(404, 'no appointments');
            }

            res.status(200).json({ userAppointments });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public deleteAppointmentHandler = async (
        req: Request<AppointmentParamInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const appointment = await this.appointmentService.findOneAppointment({ _id: id });

            if (!id || !appointment) {
                throw new HttpException(404, "appointment doesn't exist");
            }
            await this.appointmentService.deleteAppointment({ _id: id });

            res.status(200).json({ message: 'Appointment deleted successfully' });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public updateAppointmentHandler = async (
        req: Request<AppointmentUpdateInterface['params'], {}, AppointmentUpdateInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;
            const state = req.body.state;

            const appointment = await this.appointmentService.findOneAppointment({ _id: id });

            if (!id || !appointment) {
                throw new HttpException(404, "appointment doesn't exist");
            }

            await this.appointmentService.updateAppointment(
                { _id: id },
                { completed: state },
                { new: true }
            );

            res.status(200).json({
                message: state
                    ? 'apppointment marked as completed'
                    : 'apppointment marked as uncompleted',
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };
}



export default AppointmentController