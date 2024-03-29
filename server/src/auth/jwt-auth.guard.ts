import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from './skip-auth.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (isPublic) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      const authHeader: string = req.headers.authorization || '';
      const [bearer, token] = authHeader.split(' ');

      if (!token || bearer !== 'Bearer') {
        throw new UnauthorizedException();
      }

      req.user = this.jwtService.verify(token);

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
