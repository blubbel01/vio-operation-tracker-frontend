import {Component, OnInit} from '@angular/core';
import {IFaction} from "../../../interfaces/faction";
import {FactionService} from "../../../services/faction.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-faction-edit',
  templateUrl: './faction-edit.component.html',
  styleUrls: ['./faction-edit.component.scss']
})
export class FactionEditComponent implements OnInit {

  constructor(
    public factionService: FactionService,
    public authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
  }

  faction?: IFaction;

  nextUserLimit = 0;
  nextFactionName = '';

  isOwnFaction = false;

  async ngOnInit() {
    const ownFactionId = (await this.authService.getUser())?.factionId;
    if (ownFactionId != null) {
      this.isOwnFaction = true;
      this.faction = await this.factionService.get(ownFactionId);
      this.nextUserLimit = this.faction?.userLimit || 0;
      this.nextFactionName = this.faction?.name || '';
    }

    if (!this.faction) {
      this.activeRoute.params.subscribe(async (observer) => {
        this.faction = await this.factionService.get(observer['id']);
        this.nextUserLimit = this.faction.userLimit;
        this.nextFactionName = this.faction.name;
      });
    }
  }

  async updateFaction() {
    if (!this.faction) return;

    this.faction.name = this.nextFactionName;

    console.log(this.faction);

    this.faction = await this.factionService.update(this.faction);
    this.nextUserLimit = this.faction.userLimit;
    this.nextFactionName = this.faction.name;
  }

  getDateByDateString(str?: string): Date {
    if (str == null) return new Date();
    return new Date(str);
  }

  async onDelete() {
    if (!this.faction) return;
    await this.factionService.destroy(this.faction);

    if (this.isOwnFaction) {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/factions/factions']);
    }
  }

}
