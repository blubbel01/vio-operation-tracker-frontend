import { Component, OnInit } from '@angular/core';
import {IFaction} from "../../../interfaces/faction";
import {FactionService} from "../../../services/faction.service";

@Component({
  selector: 'app-faction-list',
  templateUrl: './faction-list.component.html',
  styleUrls: ['./faction-list.component.scss']
})
export class FactionListComponent implements OnInit {

  filter: string = '';
  factions: IFaction[] = [];

  constructor(
    private factionService: FactionService
  ) { }

  async ngOnInit() {
    this.factions = await this.factionService.getAll();
    console.log(this.factions)
  }

  public getFilteredFactions(): IFaction[] {
    return this.factions.filter(a => a.name.includes(this.filter));
  }

}
