import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as fas from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IFaction} from "../../interfaces/faction";
import {FactionService} from "../../services/faction.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fas = fas;

  loginForm = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3)]),
    password: new FormControl(null, Validators.minLength(6)),
  });

  faction: IFaction|null = null;

  errorMessage = '';

  constructor(
    private client: HttpClient,
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private factionService: FactionService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (observer) => {
      this.faction = await this.factionService.get(observer['id']);
    });
  }

  async onSubmitLogin() {
    if (this.loginForm.status == 'VALID') {
      const {name, password} = this.loginForm.value;
      if (await this.authService.login(name, password, this.faction?.id)) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Name oder Passwort ist falsch!';
      }
    } else {
      this.errorMessage = 'Name oder Passwort ist ungültig!';
    }
    this.loginForm.controls['password'].reset();
  }

}
