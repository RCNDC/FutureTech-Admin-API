import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const rateLimiting = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 10,
        message: 'Too many requests'
}); 