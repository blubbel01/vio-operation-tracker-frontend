import {Component, OnInit} from '@angular/core';
import {OperationTypeService} from "../../../services/operationtype.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {IOperationType} from "../../../interfaces/operation-type";
import {EOperationTypePaymentSystem} from "../../../enums/payment-system";

@Component({
  selector: 'app-operation-types-list',
  templateUrl: './operation-types-list.component.html',
  styleUrls: ['./operation-types-list.component.scss']
})
export class OperationTypesListComponent implements OnInit {

  operationTypes: IOperationType[] = [];

  filter = '';

  constructor(
    private operationTypeService: OperationTypeService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    const ownFactionId = this.authService.getLastUser()?.factionId;
    if (ownFactionId != null) {
      this.operationTypes = await this.operationTypeService.getAll(ownFactionId);
    }
  }

  async newOperationType() {
    const ownFactionId = this.authService.getLastUser()?.factionId;
    if (ownFactionId != null) {
      this.operationTypes = await this.operationTypeService.getAll(ownFactionId);

      await this.operationTypeService.create({
        name: 'Neuer Aktionstyp',
        value: 0,
        paymentMethod: EOperationTypePaymentSystem.TYPE_VALUE,
        factionId: ownFactionId,
      });

      this.ngOnInit();
    }
  }

}
