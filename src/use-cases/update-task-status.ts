import { TaskRepository } from "@/repositores/task-repository";
import { Status, Task } from "@prisma/client";

interface  UpdateTaskStatusUseCaseRequest {
    userId: string;
    taskId: string;
    status:  Status
}

interface  UpdateTaskStatusUseCaseResponse {
    task: Task;
}

export class  UpdateTaskStatusUseCase {
    constructor(private taskRepository: TaskRepository) {}
    async execute({userId, taskId, status}:  UpdateTaskStatusUseCaseRequest): Promise<UpdateTaskStatusUseCaseResponse> {
        const task = await this.taskRepository.findById(taskId);

        if (!task || task.user_id !== userId) {
            throw new Error("Task not found or you're not authorized to update this task.");
          }

          const updatedTask = await this.taskRepository.update(taskId,{
            status
          })

          return {
            task: updatedTask
          }
    }
}