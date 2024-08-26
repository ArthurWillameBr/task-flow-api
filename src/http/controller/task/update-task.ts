/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { UpdateTaskUseCase } from "@/use-cases/update-task";
import { Request, Response } from "express";
import { z } from "zod";

export async function updateTask(req: Request, res: Response) {
  const createTaskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    completed: z.boolean(),
  });

  const { title, description, completed } = createTaskBodySchema.parse(
    req.body
  );

  try {
    const taskRepository = new PrismaTaskRepository();
    const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

    const { userId } = req as any;
    const { taskId } = req.params;

    const { task } = await updateTaskUseCase.execute({
      userId,
      taskId,
      title,
      description,
      completed,
    });
    return res.status(200).send({ task });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }
  }
}
