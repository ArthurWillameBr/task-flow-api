/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { GetTasksUseCase } from "@/use-cases/get-tasks";
import { Request, Response } from "express";
import { Priority, Status } from "@prisma/client";

export async function getTasks(req: Request, res: Response) {
    try {
        const taskRepository = new PrismaTaskRepository()
        const getTaskUseCase = new GetTasksUseCase(taskRepository)

        const { userId } = req as any
        const { status } = req.query
        const { priority } = req.query
        const { title } = req.query

        const parsedStatus = Array.isArray(status) ? status.filter((status) => Object.values(Status).includes(status as Status)) as Status[] : 
        [status].filter((status) => Object.values(Status).includes(status as Status)) as Status[]

        const parsedPriority = Array.isArray(priority) ? priority.filter((priority) => Object.values(Priority).includes(priority as Priority)) as Priority[] :
        [priority].filter((priority) => Object.values(Priority).includes(priority as Priority)) as Priority[]

        const taskResponse = await getTaskUseCase.execute({
            userId,
            status: parsedStatus.length > 0 ? parsedStatus : undefined,
            priority: parsedPriority.length > 0 ? parsedPriority : undefined,
            title: title as string | undefined
        })

       return res.status(200).send(taskResponse)
    } catch (error) {
        if(error instanceof Error) {
            return res.status(400).send({message: error.message})
        }
    }
}