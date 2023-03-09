import { Injectable, CanActivate, ExecutionContext,UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService:JwtService
  ){}
   canActivate(
    context:  ExecutionContext,
  ):  boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try{
      const cookie=request.cookies["jwt"];
      if(cookie)
      {
        const data=this.jwtService.verifyAsync(cookie);
        return true;
      }

      return false;
      
    } catch(e) {
      throw new UnauthorizedException();
    }

    
  }
}