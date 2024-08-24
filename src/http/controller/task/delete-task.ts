/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { DeleteTaskUseCase } from "@/use-cases/delete-task";
import { Request, Response } from "express";

export async function deleteTask(req: Request, res: Response) {
    try {
        const { taskId } = req.params
        const { userId } = req as any;

        const taskRepository = new PrismaTaskRepository();
        const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

        await deleteTaskUseCase.execute({ taskId, userId });

        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({ message: error.message });
        }
    }
}