import upload from '../middleware/multer';
import { validate } from '../middleware/validateResource';
import { codeSchema, DeleteCodeSchema, GetCodeSchema } from '../schemas/code.schema';
import CodeController from '@/controllers/code.controller';
import { BaseRoute } from './base.route';

class CodeRoutes extends BaseRoute {
    constructor(private codeController: CodeController) {
        super('/code');
        this.initializeRoutes();
    }

    protected initializeRoutes() {
        this.router.post(
            `${this.path}/:id`,
            upload.none(),
            validate(codeSchema),
            this.codeController.createCodeHandler
        );

        this.router.get(
            `${this.path}/find/:id`,
            validate(GetCodeSchema),
            this.codeController.getCodesHandler
        );
        this.router.delete(
            `${this.path}/delete/:id`,
            upload.none(),
            validate(DeleteCodeSchema),
            this.codeController.deleteCodeHandler
        );
    }
}

export default CodeRoutes;
