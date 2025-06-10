import express from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';

import { deletePatientSchema, getPatientSchema, patientSchema } from '../schemas/patient.schema';
import {
    createPatientHandler,
    DeletePatientHandler,
    getAllPatientsHandler,
    getPatientHandler,
} from '../controllers/patients.controller';
import { Routes } from '@/interfaces/routes.interface';

class PatientRoutes implements Routes {
    public path = '/patient';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create`,
            upload.single('profileImg'),
            validate(patientSchema),
            createPatientHandler
        );
        this.router.get(`${this.path}`, getAllPatientsHandler);
        this.router.get(`${this.path}/:id`, validate(getPatientSchema), getPatientHandler);
        this.router.delete(`${this.path}/:id`, validate(deletePatientSchema), DeletePatientHandler);
    }
}

export default PatientRoutes;
