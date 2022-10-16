import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as fas from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FactionService} from "../../services/faction.service";
import {IApiResponse} from "../../interfaces/api-responses";
import {IFaction} from "../../interfaces/faction";

@Component({
  selector: 'app-register-faction',
  templateUrl: './register-faction.component.html',
  styleUrls: ['./register-faction.component.scss']
})
export class RegisterFactionComponent implements OnInit {
  fas = fas;

  registerForm = new FormGroup({
    faction: new FormControl(null, [Validators.minLength(3), Validators.required]),
    userLimit: new FormControl(null, [Validators.min(8), Validators.required]),
    username: new FormControl(null, [Validators.minLength(3), Validators.required]),
    password: new FormControl(null, [Validators.minLength(6), Validators.required]),
    password2: new FormControl(null, [Validators.minLength(6), Validators.required]),
  });

  errorMessage = '';

  constructor(
    private client: HttpClient,
    private factionService: FactionService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmitLogin() {
    if (this.registerForm.status == 'VALID') {
      const {
        faction,
        userLimit,
        username,
        password,
        password2
      } = this.registerForm.value;

      if (password != password2) {
        this.registerForm.controls['password2'].reset();
        this.errorMessage = 'Passwörter stimmen nicht überein!';
      }

      const response: IApiResponse|IFaction = await this.factionService.register({
        name: faction,
        username: username,
        password,
        userLimit
      });

      console.log(response);

      if ('error' in response) {
        this.errorMessage = response.error.message;
      } else {
        this.router.navigate([`/factions/${response.id}/login`]);
      }

    } else {
      this.errorMessage = 'Eingabe ungültig!';
    }
  }
}
