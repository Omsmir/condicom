import { Router } from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import {
    AppointmentParams,
    AppointmentSchema,
    updateAppointmentSchema,
} from '../schemas/appointment.schema';
import {
    createAppointmentHandler,
    deleteAppointmentHandler,
    getUserAppointments,
    updateAppointmentHandler,
} from '../controllers/appointments.controller';
import { Routes } from '@/interfaces/routes.interface';

class AppointmentsRoutes implements Routes {
    public path = '/appointments';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}`,
            upload.none(),
            validate(AppointmentSchema),
            createAppointmentHandler
        );
        this.router.get(`${this.path}/:id`, validate(AppointmentParams), getUserAppointments);

        this.router.delete(
            `${this.path}/:id`,
            validate(AppointmentParams),
            deleteAppointmentHandler
        );
        this.router.put(
            `${this.path}/:id`,
            upload.none(),
            validate(updateAppointmentSchema),
            updateAppointmentHandler
        );
    }
}

export default AppointmentsRoutes;
