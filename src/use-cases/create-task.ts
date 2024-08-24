import { TaskRepository } from "@/repositores/task-repository";
import { Task } from "@prisma/client";

interface CreateTaskUseCaseRequest {
  title: string;
  userId: string;
  description?: string | null;
  completed: boolean;
}

interface CreateTaskUseCaseResponse {
  task: Task;
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    title,
    completed,
    description,
    userId
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {

    const task = await this.taskRepository.create({
        user_id: userId,
        title,
        description,
        completed
    })
    return {
        task
    }
  }
}
