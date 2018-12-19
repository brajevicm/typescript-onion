import provide from "inversify-binding-decorators/dts/decorator/provide";

import {EntityDataMapper} from "../../../Core/Kernel/EntityDataMapper";
import {UserEntity} from "../../../Core/Domain/User/Entity/UserEntity";
import {UserDto} from "../../../Web/Dto/UserDto";

@provide()
export class UserDataMapper implements EntityDataMapper<UserEntity, UserDto> {
    toDto(entity: UserEntity): UserDto {
        return entity as UserDto;
    }

    toEntity(dto: UserDto): UserEntity {
        return dto as UserEntity;
    }

}