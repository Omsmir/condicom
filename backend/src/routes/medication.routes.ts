import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import {
    getmedicationSchema,
    medicationSchema,
    multipleMedicationSchema,
} from '../schemas/medication.schema';

import MedicationController from '@/controllers/medication.controller';
import { BaseRoute } from './base.route';

class MedicationRoutes extends BaseRoute {
    constructor(private medicationController: MedicationController) {
        super('/medications');
        this.initializeRoutes();
    }

    protected initializeRoutes() {
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
