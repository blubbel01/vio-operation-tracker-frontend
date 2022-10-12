import {IUser} from "./user";

export interface IApiAuthResponse {
  token: string;
}

export interface IJWTToken extends IUser{
  readonly iat: number;
}

export interface IApiResponse {
  code: number
  message: string
  error: any
}
