/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { GetTasksUseCase } from "@/use-cases/get-tasks";
import { Request, Response } from "express";

export async function getTasks(req: Request, res: Response) {
    try {
        const taskRepository = new PrismaTaskRepository()
        const getTaskUseCase = new GetTasksUseCase(taskRepository)

        const { userId } = req as any

        const { tasks } = await getTaskUseCase.execute({
            userId
        })

       return res.status(200).send({
            tasks
        })
    } catch (error) {
        if(error instanceof Error) {
            return res.status(400).send({message: error.message})
        }
    }
}