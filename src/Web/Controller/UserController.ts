import {
    controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import {inject} from 'inversify';
import {Request} from 'express';

import {UserService} from "../../Core/Interface/UserService";
import {User} from "../../Core/Interface/User";
import Types from '../Assembler/Types';

@controller('/user')
export class UserController {

    constructor(@inject(Types.UserService) private userService: UserService) {
    }

    @httpGet('/')
    public getUsers(): User[] {
        return this.userService.getUsers();
    }

    @httpGet('/:id')
    public getUser(request: Request): User {
        return this.userService.getUser(request.params.id);
    }

    @httpPost('/')
    public newUser(request: Request): User {
        return this.userService.newUser(request.body);
    }

    @httpPut('/:id')
    public updateUser(request: Request): User {
        return this.userService.updateUser(request.params.id, request.body);
    }

    @httpDelete('/:id')
    public deleteUser(request: Request): string {
        return this.userService.deleteUser(request.params.id);
    }
}
