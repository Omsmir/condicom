import { Router } from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import { getmedicationSchema, medicationSchema } from '../schemas/medication.schema';
import {
    createMedicationHandler,
    deleteMedicationHandler,
    getAllMedicationsHandler,
} from '../controllers/medication.controller';
import { Routes } from '@/interfaces/routes.interface';

class MedicationRoutes implements Routes {
    public path = '/medications';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create`,
            upload.none(),
            validate(medicationSchema),
            createMedicationHandler
        );

        this.router.get(`${this.path}`, getAllMedicationsHandler);
        this.router.delete(
            `${this.path}/:id`,
            validate(getmedicationSchema),
            deleteMedicationHandler
        );
    }
}

export default MedicationRoutes;
