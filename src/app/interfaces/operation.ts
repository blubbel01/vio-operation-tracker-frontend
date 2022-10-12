import {IFaction} from "./faction";
import {IUser} from "./user";
import {IOperationType} from "./operation-type";

export interface IOperation {
  id: number
  value: number

  timestamp: Date

  createdAt: Date
  updatedAt: Date

  operationTypeId: number
  factionId: number
  creatorId: number

  operationType?: IOperationType
  faction?: IFaction
  creator?: IUser

  users?: IUser[];
}
