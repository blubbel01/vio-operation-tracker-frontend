import {IFaction} from "./faction";

export interface IRole {
  id: number
  name: string

  accessLevel: number

  alwaysAdd: number
  perHourValue: number

  factionId: number
  faction?: IFaction
}
