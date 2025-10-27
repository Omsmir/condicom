import { Router } from "express";

export abstract class BaseRoute {

    public router: Router

    constructor(protected readonly path:string){
        this.router = Router();
    }

    protected abstract initializeRoutes(): void;
}