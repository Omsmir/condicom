import { Router } from 'express';
import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import { codeSchema, DeleteCodeSchema, GetCodeSchema } from '../schemas/code.schema';
import {
    createCodeHandler,
    deleteCodeHandler,
    getCodesHandler,
} from '../controllers/code.controller';
import { Routes } from '@/interfaces/routes.interface';

class CodeRoutes implements Routes {
    public path = '/code';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/:id`,
            upload.none(),
            validate(codeSchema),
            createCodeHandler
        );

        this.router.get(`${this.path}/find/:id`, validate(GetCodeSchema), getCodesHandler);
        this.router.delete(
            `${this.path}/delete/:id`,
            upload.none(),
            validate(DeleteCodeSchema),
            deleteCodeHandler
        );
    }
}

export default CodeRoutes;
