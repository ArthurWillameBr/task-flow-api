import { TaskRepository } from "@/repositores/task-repository";
import { Status, Task } from "@prisma/client";

interface CreateTaskUseCaseRequest {
  userId: string;
  status?: Status
}

interface CreateTaskUseCaseResponse {
  tasks: Task[];
}

export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}
  async execute({userId, status}: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const tasks = await this.taskRepository.findByUserId(userId, status);
    return {
      tasks
    }
  }
}
