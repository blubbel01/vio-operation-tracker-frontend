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

  lastPayDate: string

  factionId: number
  roleId: number

  role?: IRole
  faction?: IFaction
  operations?: IOperation[]

  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface IUpdateUserRequest {
  name?: string
  old_password?: string
  new_password?: string
  isAdmin?: boolean
  roleId?: number | null
  payedNow?: boolean
}
