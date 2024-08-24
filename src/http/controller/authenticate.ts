import { PrismaUserRepository } from "@/repositores/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { Request, Response } from "express";
import { z } from "zod";

export async function authenticate(req: Request, res: Response) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, password} = authenticateBodySchema.parse(req.body)

    try {
        const usersRepository = new PrismaUserRepository()
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        await authenticateUseCase.execute({
            email,
            password
        })

    } catch (error) {
        if(error instanceof InvalidCredentialsError) {
            return res.status(400).send({message: error.message})
        }
        throw error
    }

    return res.status(200).send({message: "Authenticated"})
}