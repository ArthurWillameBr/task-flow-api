import { PrismaUserRepository } from "@/repositores/prisma/prisma-user-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/users-already-exists-error";
import { RegisterUseCase } from "@/use-cases/register";
import { Request, Response } from "express";
import { z } from "zod";

export async function register (req: Request, res: Response) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {email, name, password} = registerBodySchema.parse(req.body)

    try {
        const usersRepository = new PrismaUserRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        await registerUseCase.execute({
            email,
            name,
            password
        })

    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).send({message: error.message})
        }

        throw error
    }

    return res.status(201).send()
}