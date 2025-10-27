import { Request, Response } from 'express';
import {
    codeSchemaInterface,
    DeleteCodeSchemaInterface,
    GetcodeSchemaInterface,
} from '../schemas/code.schema';
import { generateCode, generateExpirationDate, signRole } from '../utils/backevents';
import CodeService  from '../services/code.service';
import UserService from '../services/user.service';
import { BaseController } from './base.controller';
import HttpException from '@/exceptions/httpException';

class CodeController extends BaseController {
    private codeService: CodeService;
    private userService: UserService;
    constructor() {
        super();
        this.codeService = new CodeService();
        this.userService = new UserService();
    }

    public createCodeHandler = async (
        req: Request<codeSchemaInterface['params'], {}, codeSchemaInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const existingAdminUser = await this.userService.findUser({ _id: id, role: 'Admin' });

            if (!existingAdminUser || !id) {
                throw new HttpException(403, 'Forbidden');
            }
            const numbers = [req.body.numbers];
            const fiveNumbers = [req.body.fiveNumbers];
            const characters = [req.body.characters];

            const obj = {
                numbers,
                fiveNumbers,
                characters,
            };
            const code = generateCode({ ...obj });

            const existingCode = await this.codeService.findCode({ code });

            if (existingCode) {
                throw new HttpException(409, 'Code already exists');
            }
            const role = signRole(code);

            if (!role) {
                throw new HttpException(400, 'Not Supported Yet');
            }

            const expiration = generateExpirationDate({ month: req.body.expiration });

            const newCode = await this.codeService.createCode({ role, code, expiration });

            res.status(201).json({
                message: `${newCode.role} code generated successfully`,
                code: newCode,
            });
        } catch (error) {
            this.handleError(res, error);
        }
    };

    public getCodesHandler = async (
        req: Request<GetcodeSchemaInterface['params'], {}, {}, GetcodeSchemaInterface['query']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;

            const limit = req.query.limit;
            const cursor = req.query.cursor;

            const existingAdminUser = await this.userService.findUser({ _id: id, role: 'Admin' });

            if (!existingAdminUser || !id) {
                throw new HttpException(403, 'Forbidden');
            }

            const { codes, nextCursor } = await this.codeService.getCodes({}, limit || 3, cursor);

            if (!codes || codes.length < 1) {
                res.status(403).json({ message: 'no codes', nextCursor: null });
                return;
            }

            res.status(200).json({ codes, nextCursor });
        } catch (error: any) {
            this.handleError(res, error);
        }
    };

    public deleteCodeHandler = async (
        req: Request<DeleteCodeSchemaInterface['params'], {}, DeleteCodeSchemaInterface['body']>,
        res: Response
    ) => {
        try {
            const id = req.params.id;
            const code = req.body.code;

            const existingAdminUser = await this.userService.findUser({ _id: id, role: 'Admin' });

            if (!existingAdminUser || !id) {
                throw new HttpException(403, 'Forbidden');
            }

            const existingCode = await this.codeService.findCode({ code });

            if (!existingCode) {
                throw new HttpException(400, 'invalid code supported');
            }

            if (existingCode.used) {
                throw new HttpException(403, 'unable to delete used code');
            }

            await this.codeService.deleteCode({ _id: existingCode._id });

            res.status(200).json({ message: 'code deleted successfully' });
        } catch (error) {
            this.handleError(res,error)
        }
    };
}



export default CodeController
