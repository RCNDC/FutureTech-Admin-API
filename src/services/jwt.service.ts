import {sign, verify} from 'jsonwebtoken'
import { Payload } from '../types/payload';
import logger from '../util/logger';
export class JwtService {

    constructor(){}

    sign(payload: Payload, expires?:number): string{
        const secret = process.env.JWT_SECRET;
        const expiresIn = expires ? expires : Number(process.env.JWT_EXPIRES_IN); // default to 1 hour
        if(!secret){
            logger.error('JWT_SECRET is not defined in environment variables');
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        return sign(payload, secret, {expiresIn});
    }

    verify(token:string): Payload{
        const secret = process.env.JWT_SECRET;
        if(!secret){
            logger.error('JWT_SECRET is not defined in environment variables');
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        try{
            const decoded = verify(token, secret) as Payload;
            return decoded;
        }catch(err){
            logger.error('Invalid token');
            throw new Error('Invalid token');
        }

    }

}