import { TaskRepository } from "@/repositores/task-repository";
import { Priority, Task } from "@prisma/client";

interface  UpdateTaskPriorityUseCaseRequest {
    userId: string;
    taskId: string;
    priority: Priority
}

interface  UpdateTaskPriorityUseCaseResponse {
    task: Task;
}

export class  UpdateTaskPriorityUseCase {
    constructor(private taskRepository: TaskRepository) {}
    async execute({userId, taskId, priority}:  UpdateTaskPriorityUseCaseRequest): Promise<UpdateTaskPriorityUseCaseResponse> {
        const task = await this.taskRepository.findById(taskId);

        if (!task || task.user_id !== userId) {
            throw new Error("Task not found or you're not authorized to update this task.");
          }

          const updatedTask = await this.taskRepository.update(taskId,{
            priority
          })

          return {
            task: updatedTask
          }
    }
}