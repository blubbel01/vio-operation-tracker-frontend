import {EOperationTypePaymentSystem} from "../enums/payment-system";
import {IFaction} from "./faction";

export interface IOperationType {
  id: number
  name: string

  paymentMethod: EOperationTypePaymentSystem
  value: number

  publicTimeLimit: number

  factionId: number
  faction?: IFaction
}

export interface IOperationTypeCreateRequest {
  name: string
  paymentMethod: EOperationTypePaymentSystem
  value: number
  factionId: number
}
