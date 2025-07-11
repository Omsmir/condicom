import express from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';

import {
    deletePatientSchema,
    deletePatientsSchema,
    getPatientSchema,
    patientSchema,
    PatientsSchema,
} from '../schemas/patient.schema';

import { Routes } from '@/interfaces/routes.interface';
import PatientController from '@/controllers/patients.controller';

class PatientRoutes implements Routes {
    public path = '/patient';
    public router = express.Router();

    constructor(private patientController: PatientController) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create`,
            upload.single('profileImg'),
            validate(patientSchema),
            this.patientController.createPatientHandler
        );
        this.router.get(`${this.path}`, this.patientController.getAllPatientsHandler);
        this.router.get(
            `${this.path}/:id`,
            validate(getPatientSchema),
            this.patientController.getPatientHandler
        );
        this.router.delete(
            `${this.path}/:id`,
            validate(deletePatientSchema),
            this.patientController.DeletePatientHandler
        );

        this.router.post(
            `${this.path}/create-multi`,
            upload.none(),
            validate(PatientsSchema),
            this.patientController.createMultiplePatientsHandler
        );

        this.router.delete(
            `${this.path}/delete-multi/:id`,
            upload.none(),
            validate(deletePatientsSchema),
            this.patientController.deleteMultiplePatientsHandler
        );
    }
}

export default PatientRoutes;
