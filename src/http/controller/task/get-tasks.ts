/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { GetTasksUseCase } from "@/use-cases/get-tasks";
import { Request, Response } from "express";
import { Status } from "@prisma/client";

export async function getTasks(req: Request, res: Response) {
    try {
        const taskRepository = new PrismaTaskRepository()
        const getTaskUseCase = new GetTasksUseCase(taskRepository)

        const { userId } = req as any
        const { status } = req.query

        const isValidStatus = Object.values(Status).includes(status as Status)

        const taskResponse = await getTaskUseCase.execute({
            userId,
            status: isValidStatus ? status as Status : undefined
        })

       return res.status(200).send(taskResponse)
    } catch (error) {
        if(error instanceof Error) {
            return res.status(400).send({message: error.message})
        }
    }
}