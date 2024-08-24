import { Prisma } from "@prisma/client";
import { TaskRepository } from "../task-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTaskRepository implements TaskRepository {

    async create(data: Prisma.TaskUncheckedCreateInput) {
        const task = await prisma.task.create({
            data
        })
        return task
    }

}