import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../interfaces/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";
import {IRole} from "../../../interfaces/role";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {

  user?: IUser;
  roles?: IRole[];

  form = new FormGroup({
    password: new FormControl(null, [Validators.minLength(6)]),
    password2: new FormControl(null, [Validators.minLength(6)]),
  });

  errorMessage = '';

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (observer) => {
      this.user = await this.userService.get(observer['id']);
      this.roles = await this.roleService.getAll(this.user.factionId);
    });
  }

  async onSubmit() {
    if (this.user == null) return;

    if (this.form.status == 'VALID') {
      const {password, password2} = this.form.value;

      if (password != password2) {
        this.errorMessage = 'Passwort muss gleich sein!'
      }

      await this.userService.update(this.user.id, {
        new_password: password,
      });

      this.router.navigate(['/management/members']);
    } else {
      this.errorMessage = 'Passwort muss mindestens 6 Zeichen haben!'
    }

  }

  onBack() {
    this.router.navigate(['/management/members']);
  }

  async onDelete() {
    if (this.user == null) return;

    await this.userService.destroy(this.user);
    this.router.navigate(['/management/members']);
  }

  async setRole(roleId: number) {
    if (this.user == null) return;

    await this.userService.update(this.user.id, {
      roleId: roleId == -1 ? null : roleId,
    });

    this.ngOnInit();
  }

}
