import { Router } from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import { codeSchema, DeleteCodeSchema, GetCodeSchema } from '../schemas/code.schema';
import { Routes } from '@/interfaces/routes.interface';
import CodeController from '@/controllers/code.controller';

class CodeRoutes implements Routes {
    public path = '/code';
    public router = Router();

    constructor(private codeController: CodeController) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/:id`,
            upload.none(),
            validate(codeSchema),
            this.codeController.createCodeHandler
        );

        this.router.get(`${this.path}/find/:id`, validate(GetCodeSchema), this.codeController.getCodesHandler);
        this.router.delete(
            `${this.path}/delete/:id`,
            upload.none(),
            validate(DeleteCodeSchema),
            this.codeController.deleteCodeHandler
        );
    }
}

export default CodeRoutes;
