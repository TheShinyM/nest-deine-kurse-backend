import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { PayloadDTO } from '../login/dtos/payload.dto';
import { User } from '../users.entity';

// declare const JwtStrategy_base: new (...args: any[]) => any;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {
    super({
      jwtFromRequest: JwtStrategy.getTokenFromHeader,
      secretOrKey: 'r&^!bj2$DSp4&Wc57tUb',
    });
  }
  // public constructor(private readonly userRepo: Repository<User>) {
  //     super(userRepo);
  // }

  private static getTokenFromHeader(req): string {
    const auth = req.headers.authorization;

    return auth ? auth.replace('Bearer ', '') : undefined;
  }
  public async validate(payload: PayloadDTO): Promise<User> {
    return this.userRepo
      .findOneOrFail({ where: { id: payload.id } })
      .catch(() => {
        throw new BadRequestException('User not found');
      });
  }
}
export {};
