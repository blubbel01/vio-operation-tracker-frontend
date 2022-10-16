import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IRole} from "../../../interfaces/role";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-roles-edit',
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3)]),
    alwaysAdd: new FormControl(null),
    perHourValue: new FormControl(null),
    PERMISSION_1: new FormControl(null),
    PERMISSION_2: new FormControl(null),
    PERMISSION_3: new FormControl(null),
    PERMISSION_4: new FormControl(null),
    PERMISSION_5: new FormControl(null),
    PERMISSION_6: new FormControl(null),
    PERMISSION_7: new FormControl(null),
  });

  role?: IRole;

  constructor(
    private activeRoute: ActivatedRoute,
    private roleService: RoleService,
    private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (observer) => {
      this.role = await this.roleService.get(observer['id']);

      this.form.get('name')?.setValue(this.role.name);
      this.form.get('alwaysAdd')?.setValue(this.role.alwaysAdd);
      this.form.get('perHourValue')?.setValue(this.role.perHourValue);

      const binaryAccess = this.role.accessLevel.toString(2);
      binaryAccess.split('').forEach((value, index) => {
        this.form.get('PERMISSION_' + index)?.setValue(value == '1');
      });
    });
  }

  async onSubmit() {
    if (!this.role) return;

    if (this.form.status == 'VALID') {
      const {name, alwaysAdd, perHourValue} = this.form.value;
      let permissionString: string = '1';
      for (let i = 1; i <= 7; i++) {
        const hasPerm = this.form.value['PERMISSION_' + i];
        permissionString += hasPerm ? '1' : '0';
      }
      this.role.name = name;
      this.role.alwaysAdd = alwaysAdd;
      this.role.perHourValue = perHourValue;
      this.role.accessLevel = parseInt(permissionString, 2);
      await this.roleService.update(this.role);
      this.router.navigate(['/management/roles']);
    }
  }

  async onDelete() {
    if (!this.role) return;
    await this.roleService.destroy(this.role);
    this.router.navigate(['/management/roles']);
  }

  onBack() {
    this.router.navigate(['/management/roles']);
  }

}
