import { Component, OnInit } from '@angular/core';
import {IFaction} from "../../interfaces/faction";
import {FactionService} from "../../services/faction.service";

@Component({
  selector: 'app-factions',
  templateUrl: './factions.component.html',
  styleUrls: ['./factions.component.scss']
})
export class FactionsComponent implements OnInit {

  filter: string = '';
  factions: IFaction[] = [];

  constructor(
    private factionService: FactionService
  ) { }

  async ngOnInit() {
    this.factions = await this.factionService.getAll();
  }

  public getFilteredFactions(): IFaction[] {
    return this.factions.filter(a => a.name.includes(this.filter));
  }

}
