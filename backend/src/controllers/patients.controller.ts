import { Response, Request } from 'express';
import {
    DeletepatientSchemaInterface,
    DeletePatientsSchemaInterface,
    GetPatientByEmailSchemaInterface,
    GetpatientSchemaInterface,
    GetPatientsForPeriodSchemaInterface,
    patientSchemaInterface,
    PatientsSchemaInterface,
} from '../schemas/patient.schema';
import { deleteImage, uploadImageToFirebase } from '../utils/getPresignedUrl';
import { randomUUID } from 'crypto';
import UserService from '@/services/user.service';
import { BaseController } from './base.controller';
import PatientService from '@/services/patient.service';
import HttpException from '@/exceptions/httpException';
import AppointmentService from '@/services/appointments.service';
import { subDays } from 'date-fns';
import { PatientDocument, PatientModel } from '@/models/patient.model';
class PatientController extends BaseController {
    private patientService: PatientService;
    private userService: UserService;
    private appointmentService: AppointmentService;
    constructor() {
        super();
        this.patientService = new PatientService();
        this.userService = new UserService();
        this.appointmentService = new AppointmentService();
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
    public getAllPatientsHandler = async (
        req: Request<
            {},
            {},
            GetPatientsForPeriodSchemaInterface['body'],
            GetPatientsForPeriodSchemaInterface['query']
        >,
        res: Response
    ) => {
        try {
            const date = req.query.date;
            const pageSize = req.query.pageSize as string;
            const pageIndex = req.query.pageIndex as string;
            const filters = req.body.filters;
            if (date) {
                const validDate = subDays(new Date(), parseInt(date));

                // console.log(validDate);

                const patientCount = await this.patientService.getPatientsCount({
                    createdAt: { $gte: validDate },
                });

                res.status(200).json({ message: 'success', patientCount });
                return;
            }

            if (filters) {
                let patients;
                for (const filter of filters) {
                    patients = await this.patientService.getAllPatients({
                        [filter.columnId]: filter.value,
                    });
                }
                if (!patients || patients.length < 1) {
                    throw new HttpException(404, 'no patients');
                }
                

                res.status(200).json({ message: 'success', patients ,totalPages:patients.length});
                return;
            }
            if (!pageSize || !pageIndex) {
                throw new HttpException(400, 'Invalid page size or index');
            }
            const patients = await PatientModel.find({})
                .skip(parseInt(pageSize) * parseInt(pageIndex))
                .limit(parseInt(pageSize));

            const patientCount = await this.patientService.getPatientsCount();
            if (!patients) {
                throw new HttpException(404, "patients doesn't exists");
            }

            res.status(200).json({ message: 'success', patients, totalPages: patientCount });
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

            const appointments = await this.appointmentService.findUserAppointments({
                patientEmail: patient.email,
            });

            if (appointments) {
                await this.appointmentService.deleteMultipleAppointment({
                    patientEmail: patient.email,
                });
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

    public getPatientByEmail = async (
        req: Request<GetPatientByEmailSchemaInterface['query']>,
        res: Response
    ) => {
        try {
            const email = req.query.email;

            const patient = await this.patientService.getPatient({ email });

            if (!patient) {
                throw new HttpException(404, "patient doesn't exist");
            }
            res.status(200).json({ patient });
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

            for (const id of ids) {
                const patient = await this.patientService.getPatient({ _id: id });

                if (!patient) {
                    throw new HttpException(
                        400,
                        `patient with id: ${id} is not found interfering with the deletion process`
                    );
                }

                const patientApppointments = await this.appointmentService.findUserAppointments({
                    patientEmail: patient.email,
                });

                if (patientApppointments) {
                    await this.appointmentService.deleteMultipleAppointment({
                        patientEmail: patient.email,
                    });
                }
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
