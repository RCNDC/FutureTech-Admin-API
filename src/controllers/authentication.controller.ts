import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { SignupDto } from "../types/signupdto";
import { LoginDto } from "../types/logindto";
import logger from "../util/logger";

export class AuthenticationController {
    private authService;
    constructor() {
        this.authService = new AuthService();
    }

    private getErrorMessage(err: unknown): string {
        return err instanceof Error ? err.message : 'Something went wrong. Please try again!';
    }

    private getStatusCode(message: string): number {
        if (message === 'Email and password are required') {
            return 400;
        }
        if (message === 'Credentials not provided') {
            return 400;
        }
        if (message === 'Email already exists') {
            return 409;
        }
        if (
            message === 'Invalid email or password' ||
            message === 'Unauthorized' ||
            message === 'unauthorized'
        ) {
            return 401;
        }
        if (
            message === 'User account is locked' ||
            message === 'Your account has been deactivated. Please contact your administrator.'
        ) {
            return 403;
        }
        return 500;
    }

    async signUp(req: Request<SignupDto>, response: Response) {

        try {
            if (!req.body) {
                throw new Error('Credentials not provided');
            }
            const signupDto: SignupDto = {
                ...req.body,
                createdBy: req.user?.userId
            };
            const tokens = await this.authService.signup(signupDto);
            response.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true, // Set to true in production
                sameSite: 'none', // Adjust based on your requirements
                maxAge: process.env.REFRESH_TOKEN_EXPIRY ? parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000 : 7 * 24 * 60 * 60 * 1000 // Default to 7 days
            });
            response.status(201).json({ accessToken: tokens.accessToken });
        } catch (err: unknown) {
            const message = this.getErrorMessage(err);
            const statusCode = this.getStatusCode(message);
            logger.error('Signup endpoint failed', {
                statusCode,
                message,
                email: req.body?.email,
                stack: err instanceof Error ? err.stack : undefined
            });
            response.status(statusCode).json({ message });
        }
    }
    async logIn(req: Request<LoginDto>, response: Response) {

        try {
            if (!req.body) {
                throw new Error('Credentials not provided');
            }
            const signupDto: LoginDto = req.body;
            const tokens = await this.authService.login(signupDto);
            response.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true, // Set to true in production
                sameSite: 'none', // Adjust based on your requirements
                maxAge: process.env.REFRESH_TOKEN_EXPIRY ? parseInt(process.env.REFRESH_TOKEN_EXPIRY) * 1000 : 7 * 24 * 60 * 60 * 1000 // Default to 7 days
            });
            response.status(201).json({ accessToken: tokens.accessToken });
        } catch (err: unknown) {
            const message = this.getErrorMessage(err);
            const statusCode = this.getStatusCode(message);
            logger.error('Login endpoint failed', {
                statusCode,
                message,
                email: req.body?.email,
                stack: err instanceof Error ? err.stack : undefined
            });
            response.status(statusCode).json({ message });
        }
    }

    async refreshToken(req: Request, response: Response){
        try{
            const refreshToken = req.cookies.refreshToken;
            
            if(!refreshToken){
                response.status(401).json({message: 'Unauthorized'});
                return;
            }
            const token = await this.authService.refreshToken(refreshToken);
            response.status(200).json({accessToken: token});

        }catch(err){
            logger.error('refresh token endpoing '+err)
            response.status(401).json({message: 'unauthorized'});
        }
    }

    

    async logOut(req:Request, response: Response) {
        logger.info('ree')
        response.clearCookie('refreshToken');
        response.status(200).json({message: 'logged out'})
    }
}
