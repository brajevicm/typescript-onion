import {User} from "../../Core/Domain/User/Interface/User";

export class UserDto implements User {
    email: string;
    name: string;
}