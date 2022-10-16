import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FactionService} from "../../../services/faction.service";
import {IFactionPaymentResponse} from "../../../interfaces/faction";
import {EPermission} from "../../../enums/permission";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  EPermission = EPermission;
  payment: IFactionPaymentResponse[] = [];

  constructor(
    private factionService: FactionService,
    private userService: UserService,
    public authService: AuthService,
  ) { }


  async ngOnInit() {
    const ownFactionId = (await this.authService.getUser())?.factionId;
    if (!ownFactionId) return;
    this.payment = <IFactionPaymentResponse[]> (await this.factionService.getPayment(ownFactionId));

    console.log(this.payment);
  }

  async markAsPayed(paymentEntry: IFactionPaymentResponse) {
    paymentEntry.money = 0;
    await this.userService.update(paymentEntry.id, {
      payedNow: true,
    });
  }

}
