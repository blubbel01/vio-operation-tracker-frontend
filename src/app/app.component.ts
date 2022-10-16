import { Component } from '@angular/core';

import * as fas from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "./services/auth.service";
import {EPermission} from "./enums/permission";
import {NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-operation-tracker';
  fas = fas;
  EPermission = EPermission;

  subscription: Subscription;
  browserRefresh = false;

  constructor(
    public authService: AuthService,
    private router: Router) {

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!router.navigated) {
          this.authService.getUser();
        }
      }
    });
  }

  logoutAction() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
