import {IFaction} from "./faction";
import {IUser} from "./user";
import {IOperationType} from "./operation-type";

export interface IOperation {
  id: number
  value: number

  timestamp: number

  createdAt: number
  updatedAt: number

  valid: boolean

  operationTypeId: number
  factionId: number
  creatorId: number

  operation_type?: IOperationType
  faction?: IFaction
  creator?: IUser

  users?: IUser[];
}

export interface IOperationCreateRequest {
  value: number
  operationTypeId: number
  timestamp: number
  factionId: number
}

export interface IOperationUpdateRequest {
  value?: number
  operationTypeId?: number
  valid?: boolean
}

export interface IOperationGetAllOptions {
  offset?: number
  user: boolean
}
