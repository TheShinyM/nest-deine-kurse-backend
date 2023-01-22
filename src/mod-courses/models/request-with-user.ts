import { User } from 'src/auth/users.entity';

export interface RequestWithUser extends Request {
  user: User;
}
