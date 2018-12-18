import {
    controller, httpGet
} from 'inversify-express-utils';
import {inject} from 'inversify';
import {Request} from 'express';

import {UserService} from "../../Core/Domain/User/Interface/UserService";
import {User} from "../../Core/Domain/User/Interface/User";
import Types from '../Assembler/Types';

@controller('/user')
export class UserController {

    constructor(@inject(Types.UserService) private userService: UserService) {
    }

    @httpGet('/custom')
    public getCustom(): User[] {
        return this.userService.custom();
    }

    @httpGet('/')
    public async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }

    @httpGet('/:id')
    public async getUser(request: Request): Promise<User> {
        return await this.userService.getUser(request.params.id);
    }

    // @httpPost('/')
    // public newUser(request: Request): User {
    //     return this.userService.newUser(request.body);
    // }
    //
    // @httpPut('/:id')
    // public updateUser(request: Request): User {
    //     return this.userService.updateUser(request.params.id, request.body);
    // }
    //
    // @httpDelete('/:id')
    // public deleteUser(request: Request): string {
    //     return this.userService.deleteUser(request.params.id);
    // }
}
