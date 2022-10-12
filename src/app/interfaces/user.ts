import {IRole} from "./role";
import {IFaction} from "./faction";
import {IOperation} from "./operation";

export interface IUser {
  id: number
  name: string
  vioSystemId: number

  password: string
  salt: string

  isAdmin: boolean

  lastPayDate: Date

  factionId: number
  roleId: number

  role?: IRole
  faction?: IFaction
  operations?: IOperation[]

  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
