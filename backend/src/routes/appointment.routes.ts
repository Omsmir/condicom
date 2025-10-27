import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import {
    AppointmentParams,
    AppointmentSchema,
    GetAppointmentSchema,
    updateAppointmentSchema,
} from '../schemas/appointment.schema';

import AppointmentController from '@/controllers/appointments.controller';
import { BaseRoute } from './base.route';

class AppointmentsRoutes extends BaseRoute {
    constructor(private appointmentController: AppointmentController) {
        super('/appointments');
        this.initializeRoutes();
    }

    protected initializeRoutes() {
        this.router.post(
            `${this.path}`,
            upload.none(),
            validate(AppointmentSchema),
            this.appointmentController.createAppointmentHandler
        );
        this.router.get(
            `${this.path}/email`,
            validate(GetAppointmentSchema),
            this.appointmentController.getAppointmentByEmail
        );
        this.router.get(
            `${this.path}/:id`,
            validate(AppointmentParams),
            this.appointmentController.getUserAppointments
        );

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
