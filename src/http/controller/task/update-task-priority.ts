/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { UpdateTaskPriorityUseCase } from "@/use-cases/update-task-priority";
import { Request, Response } from "express";
import { z } from "zod";

export async function updateTaskPriority(req: Request, res: Response) {
  const updateTaskStatusSchema = z.object({
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  });

  const { priority } = updateTaskStatusSchema.parse(req.body);

  try {
    const taskRepository = new PrismaTaskRepository();
    const updateTaskStatusUseCase = new UpdateTaskPriorityUseCase(taskRepository);

    const { userId } = req as any;
    const { taskId } = req.params;

    const { task } = await updateTaskStatusUseCase.execute({
      userId,
      taskId,
      priority
    });

    return res.status(200).send({ task });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }
  }
}
