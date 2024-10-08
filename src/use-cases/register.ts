import { UserRepository } from "@/repositores/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/users-already-exists-error";
import { PasswordsDoNotMatchError } from "./errors/passwords-do-not-match-error";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({email, name, password, passwordConfirmation}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        if (password !== passwordConfirmation) {
            throw new PasswordsDoNotMatchError()
        }

        const password_hash = await hash(password, 6)

        const userWithEmail = await this.userRepository.findByEmail(email)

        if (userWithEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.userRepository.create({
            email,
            name,
            password_hash
        })

        return {
            user
        }
    }
    
}