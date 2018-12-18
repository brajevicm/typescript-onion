import {provide} from "inversify-binding-decorators";

import {User} from "../../../Core/Domain/User/Interface/User";
import Types from "../../../Web/Assembler/Types";
import {UserRepository} from "../../../Core/Domain/User/Interface/UserRepository";
import {RepositoryImpl} from "./RepositoryImpl";
import {UserEntity} from "../../../Core/Domain/User/Entity/UserEntity";
import {UserDto} from "../../../Web/Dto/UserDto";

@provide(Types.UserRepository)
export class UserRepositoryImpl extends RepositoryImpl<UserEntity, UserDto> implements UserRepository {

    custom(): User[] {
        return [{
            email: 'loremaa@ipsum.com',
            name: 'Lorem'
        }, {
            email: 'doloe@sit.com',
            name: 'Dolor'
        }];
    }
}