import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const user = this.authService.currentUser;
    if (user && user.admin) return true;

    this.router.navigate(['/no-access']);
    return false;
  }
}
