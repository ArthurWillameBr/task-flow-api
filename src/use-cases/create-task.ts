import { TaskRepository } from "@/repositores/task-repository";
import { Priority, Status, Task } from "@prisma/client";

interface CreateTaskUseCaseRequest {
  title: string;
  userId: string;
  description?: string | null;
  priority: Priority;
  status:  Status
}

interface CreateTaskUseCaseResponse {
  task: Task;
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    title,
    priority,
    status,
    description,
    userId
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {

    const task = await this.taskRepository.create({
        user_id: userId,
        title,
        description,
        priority,
        status,
    })
    return {
        task
    }
  }
}
