import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as fas from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IFaction} from "../../interfaces/faction";
import {FactionService} from "../../services/faction.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fas = fas;

  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3)]),
    password: new FormControl(null, Validators.minLength(8)),
    password2: new FormControl(null, Validators.minLength(8)),
  });

  errorMessage = '';

  faction: IFaction | null = null;

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
    if (this.registerForm.status == 'VALID') {
      const {name, password} = this.registerForm.value;
      if (await this.authService.login(name, password)) {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Name oder Passwort ist falsch!';
      }
    } else {
      this.errorMessage = 'Name oder Passwort ist ungültig!';
    }
    this.registerForm.controls['password'].reset();
  }
}
