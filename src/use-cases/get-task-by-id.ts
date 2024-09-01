import { TaskRepository } from "@/repositores/task-repository";
import { Task } from "@prisma/client";

interface GetTaskByIdUseCaseRequest {
  taskId: string;
  userId: string;
}

interface GetTaskByIdUseCaseResponse {
  task: Task | null;
}

export class GetTaskByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}
  async execute({taskId, userId}: GetTaskByIdUseCaseRequest): Promise<GetTaskByIdUseCaseResponse> {
    const task = await this.taskRepository.findByUserAndTaskId(taskId, userId);

    if (!task) {
      throw new Error("Task not found");
    }

    return {
        task,
    }
  }
}
