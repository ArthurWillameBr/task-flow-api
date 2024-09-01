/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { GetTaskByIdUseCase } from "@/use-cases/get-task-by-id";
import { Request, Response } from "express";

export async function getTaskById(req: Request, res: Response) {
    try {
        const taskRepository = new PrismaTaskRepository()
        const getTaskById = new GetTaskByIdUseCase(taskRepository)

        const { userId } = req as any
        const { taskId } = req.params

        const { task } = await getTaskById.execute({
            taskId,
            userId
        })

       return res.status(200).send({
            task
        })
    } catch (error) {
        if(error instanceof Error) {
            return res.status(400).send({message: error.message})
        }
    }
}