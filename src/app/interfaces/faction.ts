import {EFactionPaymentSystem} from "../enums/payment-system";

export interface IFaction {
    id: number
    name: string

    paymentCalculationSystem: EFactionPaymentSystem

    acceptNewUsers: boolean

    payedMoney: number

    userLimit: number
    nextUserLimit: number
    payedUntil: Date

    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export interface IFactionRegisterRequest {
  name: string
  userLimit: number
  username: string
  password: string
}
