import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as fas from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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
    password: new FormControl(null, [Validators.minLength(8), Validators.required]),
    password2: new FormControl(null, [Validators.minLength(8), Validators.required]),
  });

  errorMessage = '';

  constructor(
    private client: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
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
