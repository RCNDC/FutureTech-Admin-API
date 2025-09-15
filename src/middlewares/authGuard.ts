import { NextFunction, Request, Response } from "express";
import { JwtService } from "../services/jwt.service";
import logger from "../util/logger";

const jwtService = new JwtService();
const AuthGuard =  (req:Request, res:Response, next:NextFunction)=>{
    const authorization = req.headers.authorization;
    if(!authorization)
    {
        res.status(401).json({message: 'unauthorized'});
        return;
    }
    const token =  req.headers.authorization?.split(' ')[1];
    if(!token){
        res.status(401).json({message: 'unauthorized'});
        return;
    }
    try{
        const verfied = jwtService.verify(token || '');
        if(verfied){
            req.user = verfied;
            next();
        }else{
            res.status(401).json({message: 'unauthorized'});
            return;
        }
    } catch(error){
        logger.error(req.url+' encounter '+error);
        res.status(401).json({message: 'unauthorized'});
    }
     
}

export default AuthGuard;