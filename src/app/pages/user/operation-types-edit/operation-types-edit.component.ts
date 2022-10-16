import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OperationTypeService} from "../../../services/operationtype.service";
import {IOperationType} from "../../../interfaces/operation-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EOperationTypePaymentSystem} from "../../../enums/payment-system";

@Component({
  selector: 'app-operation-types-edit',
  templateUrl: './operation-types-edit.component.html',
  styleUrls: ['./operation-types-edit.component.scss']
})
export class OperationTypesEditComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(null),
    value: new FormControl(null),
    publicTimeLimit: new FormControl(null),
  });

  operationType?: IOperationType;

  EOperationTypePaymentSystem = EOperationTypePaymentSystem;

  constructor(
    private operationTypeService: OperationTypeService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
  }

  async ngOnInit() {
    this.activeRoute.params.subscribe(async (observer) => {
      this.operationType = await this.operationTypeService.get(observer['id']);

      this.form.get('name')?.setValue(this.operationType.name);
      this.form.get('value')?.setValue(this.operationType.value);
      this.form.get('publicTimeLimit')?.setValue(this.operationType.publicTimeLimit);
    });
  }

  setPaymentMethod(newState: EOperationTypePaymentSystem) {
    if (!this.operationType) return;

    this.operationType.paymentMethod = newState;
  }

  async onSubmit() {
    if (!this.operationType) return;

    if (this.form.status == 'VALID') {
      const {name, value, publicTimeLimit} = this.form.value;

      this.operationType.name = name;
      this.operationType.value = value;
      this.operationType.publicTimeLimit = publicTimeLimit;

      await this.operationTypeService.update(this.operationType);

      this.router.navigate(['/management/operation-types']);
    }
  }

  async onDelete() {
    if (!this.operationType) return;

    await this.operationTypeService.destroy(this.operationType);
    this.router.navigate(['/management/operation-types']);
  }

  onBack() {
    this.router.navigate(['/management/operation-types']);
  }

}
