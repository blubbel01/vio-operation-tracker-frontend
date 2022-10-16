export interface IApiAuthResponse {
  token: string
}

export interface IJWTToken {
  readonly id: number
  readonly iat: number
}

export interface IApiResponse {
  code: number
  message: string
  error: any
}
