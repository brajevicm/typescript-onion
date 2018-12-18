import {controller, httpGet, queryParam} from 'inversify-express-utils';

import {UserNotFoundException} from "../Exception/UserNotFoundException";

@controller('/')
export class HomeController {
    @httpGet('/')
    public get(@queryParam("id") userId: number): string {
        try {
            if (userId) {
                throw new UserNotFoundException(userId);
            }

            return 'Pass id as query parameter.'

        } catch (e) {
            return e.message;
        }
    }
}
