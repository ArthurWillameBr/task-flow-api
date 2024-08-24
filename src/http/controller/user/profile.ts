/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaUserRepository } from "@/repositores/prisma/prisma-user-repository";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { Request, Response } from "express";

export async function profile (req: Request, res: Response) {
    
    const usersRepository = new PrismaUserRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

    const { userId } = req as any
    
    const { user } = await getUserProfileUseCase.execute({userId})

    return res.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    })
} 