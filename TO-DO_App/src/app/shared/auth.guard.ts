import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
//enables navigation to a requested route if authenticated
export class AuthGuard implements CanActivate {
  [x: string]: any;
  //injecting auth service into auth guard
  constructor(private auth: AuthService, private router: Router) { }

  //to check if current user has permission to activate the requested route
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.auth.IsAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login']);//this happens when you enter incorrect credentials
      return false;
    }
  }
}
