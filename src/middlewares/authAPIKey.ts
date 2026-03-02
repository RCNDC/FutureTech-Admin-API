import { NextFunction, Request, Response } from "express";
import logger from "../util/logger";

const AuthAPIKey = (req:Request, res:Response, next:NextFunction)=>{
    try {
        if(req.method === 'OPTIONS'){
            next();
            return;
        }

        const apiKey = req.header('x-api-key');
        const validApiKey = process.env.API_KEY_VALUE;

        if(validApiKey === undefined){
            logger.error('API_KEY_VALUE is not defined in environment variables', {
                path: req.originalUrl,
                method: req.method
            });
            res.status(500).json({message: 'Server configuration error'});
            return;
        }

        if(apiKey && apiKey === validApiKey){
            next();
            return;
        }

        logger.warn('Unauthorized access attempt with invalid API key', {
            path: req.originalUrl,
            method: req.method
        });
        res.status(401).json({message: 'Unauthorized'});
    } catch (err) {
        logger.error('Unhandled API key middleware error', {
            path: req.originalUrl,
            method: req.method,
            error: err instanceof Error ? err.message : String(err),
            stack: err instanceof Error ? err.stack : undefined
        });
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export default AuthAPIKey;
