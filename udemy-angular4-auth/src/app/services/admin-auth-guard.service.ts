import { AuthGuard } from '../services/auth-guard.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

  canActivate() {
    let isAuthenticated = super.canActivate();
    console.log('isAuthenticated',isAuthenticated);
    if (!isAuthenticated)
      return false;

    if (this.authService.currentUser.admin)
      return true;

    this.router.navigate(['/no-access']);
    return false;
  }
}
