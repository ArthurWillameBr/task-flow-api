import { TaskRepository } from "@/repositores/task-repository";

interface DeleteTaskUseCaseRequest {
  taskId: string;
  userId: string;
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ taskId, userId }: DeleteTaskUseCaseRequest): Promise<void> {
    const task = await this.taskRepository.findById(taskId);

    if (!task || task.user_id !== userId) {
      throw new Error("Task not found or you're not authorized to delete this task.");
    }

    await this.taskRepository.delete(taskId);
  }
}