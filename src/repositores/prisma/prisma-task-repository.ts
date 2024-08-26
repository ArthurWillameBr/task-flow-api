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

    async findByUserId(userId: string) {
        const tasks = await prisma.task.findMany({
            where: {
                user_id: userId
            }
        })
        return tasks
    }

    async findById(taskId: string) {
        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        })
        return task
    }

    async delete(taskId: string) {
        await prisma.task.delete({
            where: {
                id: taskId
            }
        })
    }

    async update(taskId: string, data: Prisma.TaskUncheckedUpdateInput) {
        const task = await prisma.task.update({
            where: {
                id: taskId
            },
            data
        })
        return task
    }
}