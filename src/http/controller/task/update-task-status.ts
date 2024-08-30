/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { UpdateTaskStatusUseCase } from "@/use-cases/update-task-status";
import { Request, Response } from "express";
import { z } from "zod";

export async function updateTaskStatus(req: Request, res: Response) {
  const updateTaskStatusSchema = z.object({
    status: z.enum(["TODO", "DONE", "BACKLOG", "IN_PROGRESS", "CANCELLED"]),
  });

  const { status } = updateTaskStatusSchema.parse(req.body);

  try {
    const taskRepository = new PrismaTaskRepository();
    const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(taskRepository);

    const { userId } = req as any;
    const { taskId } = req.params;

    const { task } = await updateTaskStatusUseCase.execute({
      userId,
      taskId,
      status,
    });

    return res.status(200).send({ task });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }
  }
}
