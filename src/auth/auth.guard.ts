import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private jwtService: JwtService) { }

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
      const allowedRole = ['admin'];

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
}

@Injectable()
export class AuthGuardKasir implements CanActivate {
  constructor(private jwtService: JwtService) { }

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
      const allowedRole = ['admin'];

      if (!allowedRole.includes(payload.role)) {
        throw new UnauthorizedException('Akses tidak diizinkan. Kamu bukan Kasir.');
      }
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedException && error.message === 'Akses tidak diizinkan. Kamu bukan Kasir.') {
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
}