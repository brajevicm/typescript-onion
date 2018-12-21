import { User } from '../../Core/Interface/User';

export class UserDto implements User {
  email: string;
  name: string;
}
