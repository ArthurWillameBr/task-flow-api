import { UserRepository } from "@/repositores/users-repository";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse{
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UserRepository) {}

    async execute({userId}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new Error('User not found')
        }

        return {
            user
        }
    }
}