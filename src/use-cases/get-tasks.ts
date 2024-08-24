import { TaskRepository } from "@/repositores/task-repository";
import { Task } from "@prisma/client";

interface CreateTaskUseCaseRequest {
  userId: string;
}

interface CreateTaskUseCaseResponse {
  tasks: Task[];
}

export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}
  async execute({userId}: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const tasks = await this.taskRepository.findByUserId(userId);
    return {
      tasks
    }
  }
}
