import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {EPermission} from "../enums/permission";

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.hasPermission(route.data['permissions'] as Array<EPermission>)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
