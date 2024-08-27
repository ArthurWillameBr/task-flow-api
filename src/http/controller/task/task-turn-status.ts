/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { UpdateTaskStatusUseCase } from "@/use-cases/update-task-status";
import { Request, Response } from "express";
import { z } from "zod";

export async function updateTaskStatus(req: Request, res: Response) {
    const updateTaskStatusBodySchema = z.object({
        completed: z.boolean(),
    });

    const { completed } = updateTaskStatusBodySchema.parse(req.body);

    try {
        const { taskId } = req.params;
        const { userId } = req as any;

        const taskRepository = new PrismaTaskRepository();
        const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(taskRepository);

        const { task } = await updateTaskStatusUseCase.execute({
            taskId,
            userId,
            completed,
        });

        return res.status(200).send(task);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({ message: error.message });
        }
    }
}
