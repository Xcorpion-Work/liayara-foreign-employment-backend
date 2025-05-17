import { Request, Response } from "express";

export interface IRequest extends Request {
    body: any;
    query: any;
    user?: any;
    file?: Express.Multer.File;
}

export interface IResponse extends Response {
    metadata?: any;
}
