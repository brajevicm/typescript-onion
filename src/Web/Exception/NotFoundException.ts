export class UserNotFoundException extends Error {
    constructor(userId: number) {
        super(`User ${userId} not found!`);
        this.name = 'UserNotFoundException';
    }
}