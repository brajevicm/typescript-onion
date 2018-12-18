import {provide} from "inversify-binding-decorators";

import {UserService} from "../Interface/UserService";
import {User} from "../Interface/User";
import Types from "../../Web/Assembler/Types";

@provide(Types.UserService)
export class UserServiceImpl implements UserService {

    private userStorage: User[] = [{
        email: 'lorem@ipsum.com',
        name: 'Lorem'
    }, {
        email: 'doloe@sit.com',
        name: 'Dolor'
    }];


    public getUsers(): User[] {
        return this.userStorage;
    }

    public getUser(id: string): User {
        let result: User;
        this.userStorage.map(user => {
            if (user.name === id) {
                result = user;
            }
        });

        return result;
    }

    public newUser(user: User): User {
        this.userStorage.push(user);
        return user;
    }

    public updateUser(id: string, user: User): User {
        this.userStorage.map((entry, index) => {
            if (entry.name === id) {
                this.userStorage[index] = user;
            }
        });

        return user;
    }

    public deleteUser(id: string): string {
        let updatedUser: User[] = [];
        this.userStorage.map(user => {
            if (user.name !== id) {
                updatedUser.push(user);
            }
        });

        this.userStorage = updatedUser;
        return id;
    }
}
