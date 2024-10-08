import { TaskRepository } from "@/repositores/task-repository";
import { Priority, Status, Task } from "@prisma/client";

interface CreateTaskUseCaseRequest {
  userId: string;
  status?: Status[]
  priority?: Priority[]
  title?: string
}

interface CreateTaskUseCaseResponse {
  tasks: Task[];
}

export class GetTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}
  async execute({userId, status, priority, title}: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const tasks = await this.taskRepository.findByUserId(userId, status, priority, title);
    return {
      tasks
    }
  }
}
