import { Router } from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import {
    getmedicationSchema,
    medicationSchema,
    multipleMedicationSchema,
} from '../schemas/medication.schema';

import { Routes } from '@/interfaces/routes.interface';
import MedicationController from '@/controllers/medication.controller';

class MedicationRoutes implements Routes {
    public path = '/medications';
    public router = Router();

    constructor(private medicationController:MedicationController) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create`,
            upload.none(),
            validate(medicationSchema),
            this.medicationController.createMedicationHandler
        );

        this.router.get(`${this.path}`, this.medicationController.getAllMedicationsHandler);
        this.router.delete(
            `${this.path}/:id`,
            validate(getmedicationSchema),
            this.medicationController.deleteMedicationHandler
        );
        this.router.post(
            `${this.path}/create-multi`,
            upload.none(),
            validate(multipleMedicationSchema),
            this.medicationController.createMultipleMedicationsHandler
        );
    }
}

export default MedicationRoutes;
