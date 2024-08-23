export interface IRegistrationRequest {
  user_name: string,
  password?:string,
  employee_id: number,
  role_id: number,
}

export interface ILoginRequest {
  user_name: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshRequest{
  refreshToken:string
}
