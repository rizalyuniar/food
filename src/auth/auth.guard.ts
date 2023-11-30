import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core'; // Perhatikan perubahan di sini

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Akses tidak diizinkan. Token tidak ditemukan.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: jwtConstants.secret }
      );
      request['admin'] = payload;

      const allowedRole = this.getAllowedRoles(context);

      if (!allowedRole.includes(payload.role)) {
        throw new UnauthorizedException('Akses tidak diizinkan. Kamu bukan admin.');
      }
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedException && error.message === 'Akses tidak diizinkan. Kamu bukan admin.') {
        throw error;
      }
      throw new UnauthorizedException('Token tidak valid.');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getAllowedRoles(context: ExecutionContext): string[] {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    return Array.isArray(roles) ? roles : [roles];
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);