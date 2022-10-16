import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IFaction} from "../../../interfaces/faction";
import {IUser} from "../../../interfaces/user";
import {FactionService} from "../../../services/faction.service";
import {RoleService} from "../../../services/role.service";
import {IRole} from "../../../interfaces/role";

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private factionService: FactionService,
    private roleService: RoleService,
    private activeRoute: ActivatedRoute) { }


  faction?: IFaction;
  roles: IRole[] = [];
  ownFactionId?: number;

  filter = '';

  async ngOnInit() {
    this.ownFactionId = (await this.authService.getUser())?.factionId;
    if (!this.ownFactionId) return;

    this.faction = await this.factionService.get(this.ownFactionId);
    this.roles = await this.roleService.getAll(this.faction.id);
  }

  async newRole() {
    if (this.ownFactionId == null) return;

    await this.roleService.create({
      name: 'Neue Rolle',
      accessLevel: 0,
      alwaysAdd: 0,
      perHourValue: 0,
      factionId: this.ownFactionId
    });

    this.ngOnInit();
  }

}
