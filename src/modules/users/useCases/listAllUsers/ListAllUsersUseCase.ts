import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}

class ListAllUsersUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ user_id }: IRequest): User[] {
        const users = this.usersRepository.list();
        const user = this.usersRepository.findById(user_id);

        if (user) {
            if (user.admin) return users;

            throw new Error("Usuário não é um admin");
        }

        throw new Error("Usuário não encontrado com o ID fornecido");
    }
}

export { ListAllUsersUseCase };
