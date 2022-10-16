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

export interface IRoleCreateRequest {
  name: string
  accessLevel: number
  alwaysAdd: number
  perHourValue: number
  factionId: number
}
