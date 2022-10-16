import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";
import {OperationService} from "../../../services/operation.service";
import {OperationTypeService} from "../../../services/operationtype.service";
import {AuthService} from "../../../services/auth.service";
import {IOperationType} from "../../../interfaces/operation-type";

@Component({
  selector: 'app-operations-create',
  templateUrl: './operations-create.component.html',
  styleUrls: ['./operations-create.component.scss']
})
export class OperationsCreateComponent implements OnInit {

  form = new FormGroup({
    operationTypeId: new FormControl(),
    value: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    users: new FormControl(),
  });

  operationTypes: IOperationType[] = [];

  ownFactionId?: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private operationService: OperationService,
    private operationTypesService: OperationTypeService,
    private authService: AuthService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.ownFactionId = (await this.authService.getUser())?.factionId;
    if (!this.ownFactionId) return;

    this.operationTypes = await this.operationTypesService.getAll(this.ownFactionId);

    console.log(this.operationTypes);
  }


  async onSubmit() {
    if (!this.ownFactionId) return;

    if (this.form.status == 'VALID') {
      const {operationTypeId, value, date, time} = this.form.value;

      const [day, month, year] = date.split('/').map((n: string) => parseInt(n));
      const [hour, minute] = time.split(':').map((n: string) => parseInt(n));

      const timestamp: Date = new Date();
      timestamp.setFullYear(year, month-1, day);
      timestamp.setHours(hour, minute, 0, 0);

      await this.operationService.create({
        operationTypeId,
        value,
        timestamp: timestamp.getTime(),
        factionId: this.ownFactionId,
      });

      this.router.navigate(['/operations']);
    }
  }

  onBack() {
    this.router.navigate(['/operations']);
  }

}
