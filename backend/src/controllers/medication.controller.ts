import { Response, Request } from 'express';
import {
    GetmedicationSchemaInterface,
    medicationSchemaInterface,
    medicationsSchemaInterface,
} from '@schemas/medication.schema';
import { BaseController } from './base.controller';
import MedicationService from '@/services/medication.service';
import HttpException from '@/exceptions/httpException';

class MedicationController extends BaseController {
    private medicationService: MedicationService;
    constructor() {
        super();
        this.medicationService = new MedicationService();
    }

    public createMedicationHandler = async (
        req: Request<{}, {}, medicationSchemaInterface['body']>,
        res: Response
    ) => {
        try {
            const name = req.body.name;

            const strength = req.body.strength;
            const stock_quantity = req.body.stock_quantity;

            const existedMedication = await this.medicationService.getSpecficMedication({
                name,
                strength,
            });

            if (existedMedication) {
                existedMedication.stock_quantity =
                    Number(existedMedication.stock_quantity) + Number(stock_quantity);

                existedMedication.updateOne(req.body);

                await existedMedication.save();

                res.status(201).json({
                    message: 'medication updated successfully',
                    existedMedication,
                });
                return;
            }

            const medication = await this.medicationService.createMedication(req.body);

            res.status(201).json({ message: 'medication created successfully', medication });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public createMultipleMedicationsHandler = async (
        req: Request<{}, {}, medicationsSchemaInterface['body']>,
        res: Response
    ) => {
        try {
            const medications = req.body.medications;

            for (const medication of medications) {
                const existedMedication = await this.medicationService.getSpecficMedication({
                    name: medication.name,
                    strength: medication.strength,
                });

                if (existedMedication) {
                    throw new HttpException(
                        403,
                        `medication with name ${existedMedication.name} already exists `
                    );
                }
            }

            const createdmedications =
                await this.medicationService.createMultipleMedications(medications);

            if (!createdmedications) {
                throw new HttpException(400, 'error occured while creating medications');
            }

            res.status(201).json({
                message: `${createdmedications.length} medications have been added`,
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public deleteMedicationHandler = async (
        req: Request<GetmedicationSchemaInterface['params']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const medication = await this.medicationService.getSpecficMedication({ _id: id });

            if (!medication) {
                throw new HttpException(404, "medication doesn't exist");
            }

            await this.medicationService.deleteMedication({ _id: id });

            res.status(200).json({ message: 'medication deleted successfully' });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public getAllMedicationsHandler = async (req: Request, res: Response) => {
        try {
            const medications = await this.medicationService.getMedications();

            if (!medications) {
                throw new HttpException(404, 'No medications');
            }

            res.status(200).json({ message: 'success', medications });
        } catch (error) {
            this.handleError(res, error);

        }
    };
}

export default MedicationController