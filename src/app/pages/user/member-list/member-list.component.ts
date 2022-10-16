import { Component, OnInit } from '@angular/core';
import {FactionService} from "../../../services/faction.service";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {IFaction} from "../../../interfaces/faction";
import {IUser} from "../../../interfaces/user";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private factionService: FactionService,
    private userService: UserService,
    private activeRoute: ActivatedRoute
  ) { }

  faction?: IFaction;
  users: IUser[] = [];

  filter = '';

  async ngOnInit() {
    const ownFactionId = (await this.authService.getUser())?.factionId;
    if (ownFactionId != null) {
      this.faction = await this.factionService.get(ownFactionId);
      this.users = await this.userService.getAllOfFaction(this.faction.id);
    }

    if (!this.faction) {
      this.activeRoute.params.subscribe(async (observer) => {
        this.faction = await this.factionService.get(observer['id']);
        this.users = await this.userService.getAllOfFaction(this.faction.id);
      });
    }
  }

  getDateByDateString(str?: string): Date {
    if (str == null) return new Date();
    return new Date(str);
  }

  async setAdminStatus(user: IUser, status: boolean) {
    await this.userService.update(user.id, {
      isAdmin: status
    });

    const idx = this.users.findIndex((_user) => _user.id == user.id);
    this.users[idx].isAdmin = status;
  }

}
