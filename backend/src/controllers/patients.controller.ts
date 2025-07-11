import { Response, Request } from 'express';
import {
    DeletepatientSchemaInterface,
    DeletePatientsSchemaInterface,
    GetpatientSchemaInterface,
    patientSchemaInterface,
    PatientsSchemaInterface,
} from '../schemas/patient.schema';
import { deleteImage, uploadImageToFirebase } from '../utils/getPresignedUrl';
import { randomUUID } from 'crypto';
import UserService from '@/services/user.service';
import { BaseController } from './base.controller';
import PatientService from '@/services/patient.service';
import HttpException from '@/exceptions/httpException';

class PatientController extends BaseController {
    private patientService: PatientService;
    private userService: UserService;
    constructor() {
        super();
        this.patientService = new PatientService();
        this.userService = new UserService();
    }

    public createPatientHandler = async (
        req: Request<{}, {}, patientSchemaInterface['body']>,
        res: Response
    ) => {
        try {
            const email = req.body.email;

            const existingPatient = await this.patientService.getPatient({ email: email });

            if (existingPatient) {
                throw new HttpException(400, 'patient already exist');
            }
            const image = req.file as Express.Multer.File;

            const profileImg = await uploadImageToFirebase({
                image: image,
                path: 'patients',
                userId: randomUUID(),
            });

            const patient = await this.patientService.createPatient({
                ...req.body,
                profileImg,
            });

            res.status(201).json({ message: 'patient created successfully', patient });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public createMultiplePatientsHandler = async (
        req: Request<{}, {}, PatientsSchemaInterface['body']>,
        res: Response
    ) => {
        try {
            const patients = req.body.patients;

            for (const patient of patients) {
                const existedPatient = await this.patientService.getPatient({
                    email: patient.email,
                });

                if (existedPatient) {
                    throw new HttpException(
                        403,
                        `Patient with email ${existedPatient.email} already exists `
                    );
                }
            }

            const createdPatients = await this.patientService.CreateMultiplePatients(patients);

            if (!createdPatients) {
                throw new HttpException(400, 'error occured while creating patients');
            }

            res.status(201).json({
                message: `${createdPatients.length} patients have been added`,
            });
        } catch (error: any) {
            this.handleError(res, error);
        }
    };

    public getAllPatientsHandler = async (req: Request, res: Response) => {
        try {
            const Patients = (await this.patientService.getAllPatients()).sort().reverse();

            if (!Patients) {
                throw new HttpException(404, "patients doesn't exists");
            }

            res.status(200).json({ message: 'success', Patients });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public getPatientHandler = async (
        req: Request<GetpatientSchemaInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;
            const patient = await this.patientService.getPatient({ id: id });

            if (!patient) {
                throw new HttpException(404, "patient doesn't exists");
            }

            res.status(200).json({ patient });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public DeletePatientHandler = async (
        req: Request<DeletepatientSchemaInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;
            const patient = await this.patientService.getPatient({ id: id });

            if (!patient) {
                throw new HttpException(404, "patient doesn't exists");
            }

            await deleteImage(patient.profileImg?.path);

            await this.patientService.deletePatient({ id: id });
            res.status(200).json({
                message: 'patient deleted successfully',
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public deleteMultiplePatientsHandler = async (
        req: Request<
            DeletePatientsSchemaInterface['params'],
            {},
            DeletePatientsSchemaInterface['body'],
            DeletePatientsSchemaInterface['query']
        >,
        res: Response
    ) => {
        try {
            const id = req.params.id;
            const ids = req.body.patientsIds;
            const all = req.query.all;

            const adminUser = await this.userService.findUser({ _id: id, role: 'Admin' }); // need to have roles options here

            if (!adminUser) {
                throw new HttpException(403, "deletion operation can't be completed");
            }

            if (all === 'true') {
                const deletedPatients = await this.patientService.deleteAllPatients();

                if (!deletedPatients || deletedPatients.deletedCount === 0) {
                    throw new HttpException(400, 'error occurred while deleting patients');
                }

                res.status(201).json({
                    message: `all patients have been deleted successfully`,
                });
                return;
            }
            const deletedPatients = await this.patientService.deleteMultiplePatients(ids);

            if (!deletedPatients || deletedPatients.deletedCount === 0) {
                if (!deletedPatients) {
                    throw new HttpException(400, 'error occurred while deleting patients');
                }
                throw new HttpException(404, 'error finding patients with those ids');
            }
            res.status(201).json({
                message: `${deletedPatients.deletedCount} patients have been deleted successfully`,
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };
}

export default PatientController;
