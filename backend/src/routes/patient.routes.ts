import express from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';

import {
    deletePatientSchema,
    deletePatientsSchema,
    getPatientByEmailSchema,
    getPatientSchema,
    getPatientsForPeriodSchema,
    patientSchema,
    PatientsSchema,
} from '../schemas/patient.schema';

import PatientController from '@/controllers/patients.controller';
import { BaseRoute } from './base.route';

class PatientRoutes extends BaseRoute {
    constructor(private patientController: PatientController) {
        super('/patients');
        this.initializeRoutes();
    }

    protected initializeRoutes() {
        this.router.post(
            `${this.path}/create`,
            upload.single('profileImg'),
            validate(patientSchema),
            this.patientController.createPatientHandler
        );

        this.router.get(
            `${this.path}`,
            upload.none(),
            validate(getPatientsForPeriodSchema),
            this.patientController.getAllPatientsHandler
        );
        this.router.get(
            `${this.path}/period`,
            validate(getPatientsForPeriodSchema),
            this.patientController.getAllPatientsHandler
        );
        this.router.get(
            `${this.path}/email`,
            validate(getPatientByEmailSchema),
            this.patientController.getPatientByEmail
        );
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
