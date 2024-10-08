import { Priority, Prisma, Status, Task } from '@prisma/client';

export interface TaskRepository {
    create: (data: Prisma.TaskUncheckedCreateInput) => Promise<Task>;
    findByUserId: (userId: string, status?: Status[], priority?: Priority[], title?: string) => Promise<Task[]>;
    findById: (taskId: string) => Promise<Task | null>;
    findByUserAndTaskId: (userId: string, taskId: string) => Promise<Task | null>;
    delete: (taskId: string) => Promise<void>;
    update: (taskId: string, data: Prisma.TaskUncheckedUpdateInput) => Promise<Task>;
}