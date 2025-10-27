import { Response, Request } from 'express';
import {
    AppointmentParamInterface,
    AppointmentSchemaInterface,
    AppointmentUpdateInterface,
    GetAppointmentByEmailInterface,
} from '../schemas/appointment.schema';
import AppointmentService from '../services/appointments.service';
import UserService from '../services/user.service';
import { BaseController } from './base.controller';
import HttpException from '@/exceptions/httpException';
import PatientService from '@/services/patient.service';
import { sortBy } from 'lodash';
import { isSameDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { IsSameDayWithTimeZone } from '@/utils/backevents';

class AppointmentController extends BaseController {
    private appointmentService: AppointmentService;
    private userService: UserService;
    private patientService: PatientService;
    constructor() {
        super();
        this.appointmentService = new AppointmentService();
        this.userService = new UserService();
        this.patientService = new PatientService();
    }
    public createAppointmentHandler = async (
        req: Request<
            {},
            {},
            AppointmentSchemaInterface['body'],
            AppointmentSchemaInterface['query']
        >,
        res: Response
    ) => {
        try {
            const userId = req.body.userId;
            const patientEmail = req.body.patientEmail;
            const patientState = req.query.patientState

            const startDate = new Date(req.body.startDate);
            const endDate = new Date(req.body.endDate);


            const query = {
                $or: [
                    {
                        // New startDate inside an existing range
                        startDate: { $lt: startDate },
                        endDate: { $gt: startDate },
                    },
                    {
                        // New endDate inside an existing range
                        startDate: { $lt: endDate },
                        endDate: { $gt: endDate },
                    },
                    {
                        // New range engulfs an existing one
                        startDate: { $gte: startDate },
                        endDate: { $lte: endDate },
                    },
                ],
            };

            const generalReservedDates = await this.appointmentService.findUserAppointments({
                user: userId,
                ...query,
            });


            if (patientEmail) {
                const patient = await this.patientService.getPatient({ email: patientEmail });

                if (!patient) {
                    throw new HttpException(404, 'Patient with the provided email is not found');
                }

                const patientReservedDates = await this.appointmentService.findUserAppointments({
                    patientEmail,
                    ...query,
                });

                if (patientReservedDates.length > 0) {
                    throw new HttpException(
                        404,
                        'The new appointment conflicts with another appointments for this patient'
                    );
                }
            }

            const { message, reservedDateState } = await this.appointmentService.checkReservedDates(
                { startDate, endDate }
            );

            if (reservedDateState) {
                throw new HttpException(400, message);
            }

            if (generalReservedDates && generalReservedDates.length > 0) {
                if (patientState) {
                    throw new HttpException(
                        400,
                        'The new appointment conflicts with another patient appointment or other.'
                    );
                }
                
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

            const sortedAppointments = sortBy(userAppointments, ['startDate']);

            if (!userAppointments) {
                throw new HttpException(404, 'no appointments');
            }

            res.status(200).json({ userAppointments: sortedAppointments });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public getAppointmentByEmail = async (
        req: Request<GetAppointmentByEmailInterface['query']>,
        res: Response
    ) => {
        try {
            const email = req.query.email;

            const appointments = await this.appointmentService.findUserAppointments({
                patientEmail: email,
            });

            const sortedAppointments = sortBy(appointments, ['startDate']);

            if (!appointments || appointments.length === 0) {
                throw new HttpException(404, 'No appointments found for this email');
            }

            res.status(200).json({ appointments: sortedAppointments });
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

export default AppointmentController;
