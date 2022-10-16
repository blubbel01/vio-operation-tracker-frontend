import { Component, OnInit } from '@angular/core';
import * as fas from '@fortawesome/free-solid-svg-icons';
import {IOperation} from "../../../interfaces/operation";
import {OperationService} from "../../../services/operation.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {EPermission} from "../../../enums/permission";
import {IApiResponse} from "../../../interfaces/api-responses";

@Component({
  selector: 'app-operations-user',
  templateUrl: './operations-user.component.html',
  styleUrls: ['./operations-user.component.scss']
})
export class OperationsUserComponent implements OnInit {

  fas = fas;

  operations: IOperation[] = [];

  EPermission = EPermission;

  constructor(
    private operationService: OperationService,
    public authService: AuthService,
  ) { }

  async ngOnInit() {
    const ownFactionId = (await this.authService.getUser())?.factionId;
    if (!ownFactionId) return;

    this.operations = await this.operationService.getAll(ownFactionId, {
      user: true,
    });
  }

  userInOperation(operation: IOperation) {
    return operation.users?.some(u => u.id == this.authService.getLastUser()?.id) || false;
  }

  async operationToggleUser(operation: IOperation, status: boolean) {
    const user = this.authService.getLastUser();
    if (!user) return;
    await this.operationService.toggleUser(operation, user.id, status);
    this.ngOnInit();
  }

  async setValid(operation: IOperation) {
    const newOperation = await this.operationService.update(operation.id, {
      valid: true,
    });
    operation.valid = newOperation.valid;
  }

  async onDelete(operation: IOperation) {
    await this.operationService.destroy(operation);
    this.ngOnInit();
  }

}
