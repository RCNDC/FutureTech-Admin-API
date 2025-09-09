import { SignupDto } from "../types/signupdto";
import logger from "../util/logger";
import { JwtService } from "./jwt.service";
import { db } from "../util/db";
import type { dashboard_user } from "../generated/prisma";
import { v4 } from "uuid";
import {hashSync, compareSync, genSaltSync} from 'bcrypt'
import { AuthTokens } from "../types/authtokens";

export class AuthService{
    private jwtService: JwtService;
    constructor(){
        this.jwtService = new JwtService();
    }

    async signup(signupDto: SignupDto): Promise<AuthTokens>{
        // Here you would normally handle user registration logic
        if(!signupDto.email || !signupDto.password){
            logger.error('Email and password are required');
            throw new Error('Email and password are required');
        }
        const newUser: dashboard_user = {
            id: v4(),
            email: signupDto.email,
            password: hashSync(signupDto.password, genSaltSync(10)),
            createdAt: new Date(),
            updatedAt: new Date(),
            isLocked: 0,
            isNew: 1
        }
        try{
            const userCreated = await db.dashboard_user.create({data: newUser});

            const accessToken =  this.jwtService.sign({userId: userCreated.id, email: userCreated.email});
            const refreshToken =  this.jwtService.sign({userId: userCreated.id, email: userCreated.email});
            return {accessToken, refreshToken};

        }catch(err){
            logger.error('Error creating user: '+ err +' with email: '+ signupDto.email);
            throw new Error('Error creating user');
        }

    }
}