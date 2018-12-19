import {provide} from "inversify-binding-decorators";
import {getConnection, Repository as TypeORMRepository} from "typeorm";

import {User} from "../../../Core/Domain/User/Interface/User";
import Types from "../../../Web/Assembler/Types";
import {UserRepository} from "../../../Core/Domain/User/Interface/UserRepository";
import {UserEntity} from "../../../Core/Domain/User/Entity/UserEntity";

@provide(Types.UserRepository)
export class UserRepositoryImpl implements UserRepository {

    private repository: TypeORMRepository<UserEntity>;

    public constructor(
    ) {
        this.repository = getConnection().getRepository(UserEntity);
    }

    custom(): User[] {
        return [{
            id: 1,
            email: 'loremaa@ipsum.com',
            name: 'Lorem'
        }, {
            id: 2,
            email: 'doloe@sit.com',
            name: 'Dolor'
        }];
    }

    findAll(): Promise<User[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<User> {
        return this.repository.findOne(id);
    }

    findManyById(ids: string[]): Promise<User[]> {
        return undefined;
    }

    save(doc: User): Promise<User> {
        return undefined;
    }
}