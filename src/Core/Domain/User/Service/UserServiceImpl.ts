import {provide} from "inversify-binding-decorators";

import {UserService} from "../Interface/UserService";
import {User} from "../Interface/User";
import Types from "../../../../Web/Assembler/Types";
import {inject} from "inversify";
import {UserRepository} from "../Interface/UserRepository";

@provide(Types.UserService)
export class UserServiceImpl implements UserService {

    constructor(@inject(Types.UserRepository) private userRepository: UserRepository) {
    }

    custom(): User[] {
        return this.userRepository.custom();
    }

    public async getUser(id: string): Promise<User> {
        return await this.userRepository.findById(id);
    }

    public async getUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }


}
