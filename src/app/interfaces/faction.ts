import {EFactionPaymentSystem} from "../enums/payment-system";

export interface IFaction {
    id: number
    name: string

    paymentCalculationSystem: EFactionPaymentSystem

    acceptNewUsers: boolean

    payedMoney: number

    userLimit: number
    nextUserLimit: number
    payedUntil: string

    createdAt: string
    updatedAt: string
    deletedAt: string
}

export interface IFactionRegisterRequest {
  name: string
  userLimit: number
  username: string
  password: string
}

export interface IFactionPaymentResponse {
  id: number
  vioId: number
  name: string
  money: number
}
