import { TaskRepository } from "@/repositores/task-repository";
import { Priority, Status, Task } from "@prisma/client";

interface UpdateTaskUseCaseRequest {
    userId: string;
    taskId: string;
    title: string;
    description: string;
    priority: Priority;
    status:  Status
}

interface UpdateTaskUseCaseResponse {
    task: Task;
}

export class UpdateTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}
    async execute({userId, taskId, title, description, priority, status}: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
        const task = await this.taskRepository.findById(taskId);

        if (!task || task.user_id !== userId) {
            throw new Error("Task not found or you're not authorized to update this task.");
          }

          const updatedTask = await this.taskRepository.update(taskId,{
            title,
            description,
            priority,
            status
          })

          return {
            task: updatedTask
          }

    }
}