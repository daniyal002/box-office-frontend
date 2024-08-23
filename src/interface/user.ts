import { IEmployeeOption, IEmployeeResponse } from "./employee"
import { IRole, IRoleOption } from "./role"

export interface IUserRequest{
    id:number,
    user_name:string,
    password:string,
    employee_id:number,
    role_id:number
}

export interface IUserResponse{
    id:number,
    user_name:string,
    password:string,
    employee:IEmployeeResponse,
    role:IRole
}

export interface IUserFormValues{
    id:number,
    user_name:string,
    password:string,
    employee:IEmployeeOption,
    role:IRoleOption
}

export interface IUserOption{
    value:number,
    label:string,
}