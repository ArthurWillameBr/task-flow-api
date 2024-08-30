/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaTaskRepository } from "@/repositores/prisma/prisma-task-repository";
import { CreateTaskUseCase } from "@/use-cases/create-task";
import { Request, Response } from "express";
import { z } from "zod";

export async function createTask(req: Request, res: Response) {
  const createTaskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    status: z.enum(["TODO", "DONE", "BACKLOG", "IN_PROGRESS", "CANCELLED"]),
  });

  const { title, description, priority, status } = createTaskBodySchema.parse(
    req.body
  );

  try {
    const taskRepository = new PrismaTaskRepository();
    const createTaskUseCase = new CreateTaskUseCase(taskRepository);

    const { userId } = req as any;

    const { task } = await createTaskUseCase.execute({
      userId,
      title,
      description,
      priority,
      status,
    });

    return res.status(201).send({ task });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }
  }
}
