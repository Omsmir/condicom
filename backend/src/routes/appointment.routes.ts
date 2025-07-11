import { Router } from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import {
    AppointmentParams,
    AppointmentSchema,
    updateAppointmentSchema,
} from '../schemas/appointment.schema';

import { Routes } from '@/interfaces/routes.interface';
import AppointmentController from '@/controllers/appointments.controller';

class AppointmentsRoutes implements Routes {
    public path = '/appointments';
    public router = Router();

    constructor(private appointmentController:AppointmentController) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}`,
            upload.none(),
            validate(AppointmentSchema),
            this.appointmentController.createAppointmentHandler
        );
        this.router.get(`${this.path}/:id`, validate(AppointmentParams), this.appointmentController.getUserAppointments);

        this.router.delete(
            `${this.path}/:id`,
            validate(AppointmentParams),
            this.appointmentController.deleteAppointmentHandler
        );
        this.router.put(
            `${this.path}/:id`,
            upload.none(),
            validate(updateAppointmentSchema),
           this.appointmentController.updateAppointmentHandler
        );
    }
}

export default AppointmentsRoutes;
