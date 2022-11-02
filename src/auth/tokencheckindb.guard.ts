import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

//this guard check running to implement
export class TokenCheckInDb implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    return true;
  }
}
