import { Component } from '@angular/core';

import * as fas from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-operation-tracker';
  fas = fas;

  constructor(public auth: AuthService) {}


}
