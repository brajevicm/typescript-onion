import {User} from "../../Core/Domain/User/Interface/User";

export class UserDto implements User {
    id: number;
    email: string;
    name: string;
}