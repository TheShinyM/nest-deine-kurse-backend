import {
  CanActivate,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../users.entity';
import { UserRole } from './user-role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context): boolean {
    const handlerRoles = this.makeStringArray(
      this.reflector.get('roles', context.getHandler()) || ''
    );
    const classRoles = this.makeStringArray(
      this.reflector.get('roles', context.getClass()) || ''
    );
    const roles = [...classRoles, ...handlerRoles];

    if (!roles || roles.length <= 0) {
      return true;
    }
    const req =
      context.getType() === 'ws'
        ? context.switchToWs().getClient()
        : context.switchToHttp().getRequest();
    if (!(req.user instanceof User)) {
      throw new InternalServerErrorException('Rollen');
    }
    const user = req.user;
    if (!user.roles) {
      return false;
    }
    return user && user.roles && this.hasRole(user, roles);
  }
  private hasRole(user: User, roles: string[]) {
    if (user.role === UserRole.ADMIN) {
      return true;
    }
    // for (const role of user.roles) {
    //     if (roles.includes(role)) {
    //         return true;
    //     }
    // }

    return false;
  }
  makeStringArray(makingString: string): string[] {
    makingString = makingString + '';
    return makingString.split(';');
  }
}
