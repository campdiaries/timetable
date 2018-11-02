import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.user.pipe(
      take(1),
      tap(user => {
        console.log('in tap ', user);
      }),
      map(user => this.authService.isAuthorized(user)),
      tap(isAuthorized => {
        if (!isAuthorized) {
          console.error('Not Authorized!');
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
