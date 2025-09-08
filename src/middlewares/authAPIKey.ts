import { NextFunction, Request, Response } from "express";
import logger from "../util/logger";

const AuthAPIKey = (req:Request, res:Response, next:NextFunction)=>{
    const apiKey = req.header('x-api-key');
    const validApiKey = process.env.API_KEY_VALUE;
    if(validApiKey === undefined){
        logger.error('API_KEY_VALUE is not defined in environment variables');
        throw new Error('API_KEY_VALUE is not defined in environment variables');
    }
    if(apiKey && apiKey === validApiKey){
        next();
    }else{
        
        res.status(401).json({message: 'Unauthorized'});
    }
}

export default AuthAPIKey;