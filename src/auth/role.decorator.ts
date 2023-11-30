import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Role } from './auth.guard';

export const Roles = (...roles: string[]) => {
  return applyDecorators(
    UseGuards(AuthGuard),
    Role(...roles),
  );
};
