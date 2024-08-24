/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { env } from "@/env";
import { UnauthorizedError } from "@/use-cases/errors/unauthorized-error";

type jwtPayload = {
    id: string;
};

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(new UnauthorizedError());
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, env.JWT_SECRET) as jwtPayload;
        (req as any).userId = id
        next();
    } catch (error) {
        return next(new UnauthorizedError());
    }
}