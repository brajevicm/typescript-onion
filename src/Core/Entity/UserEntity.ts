import {provide} from "inversify-binding-decorators";

import {User} from "../Interface/User";
import Types from "../../Web/Assembler/Types";

@provide(Types.User)
export class UserEntity implements User {
    email: string;
    name: string;
}