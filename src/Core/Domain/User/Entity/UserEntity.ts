import {provide} from "inversify-binding-decorators";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

import {User} from "../Interface/User";
import Types from "../../../../Web/Assembler/Types";

@Entity()
@provide(Types.User)
export class UserEntity implements User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;
}