import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as fas from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FactionService} from "../../../services/faction.service";
import {UserService} from "../../../services/user.service";
import {IApiResponse} from "../../../interfaces/api-responses";
import {IUser} from "../../../interfaces/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fas = fas;

  errorMessage = '';

  changePasswordForm = new FormGroup({
    passwordOld: new FormControl(null, Validators.minLength(6)),
    passwordNew: new FormControl(null, Validators.minLength(6)),
    passwordNew2: new FormControl(null, Validators.minLength(6)),
  });

  constructor(
    private client: HttpClient,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }


  async onSubmit() {
    if (this.changePasswordForm.status == 'VALID') {
      const {
        passwordOld,
        passwordNew,
        passwordNew2
      } = this.changePasswordForm.value;

      if (passwordNew != passwordNew2) {
        this.errorMessage = 'Passwörter stimmern nicht überein!';
        return;
      }

      const ownUserId = this.authService.getOwnUserId();

      const response: IApiResponse | IUser = await this.userService.update(ownUserId, {
        old_password: passwordOld,
        new_password: passwordNew
      });

      if ('code' in response) {
        this.errorMessage = 'Passwort ist falsch!';
      } else {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    } else {
      this.errorMessage = 'Eingabe ist ungültig!';
    }
    this.changePasswordForm.controls['passwordNew'].reset();
    this.changePasswordForm.controls['passwordNew2'].reset();
  }

}
