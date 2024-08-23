import { IDepartment, IDepartmentOption } from "./department"
import { IPost, IPostOption } from "./post"

export interface IEmployeeRequest{
    id:number,
    employee_name:string,
    post_id:number,
    department_id:number,
    dismissed:boolean
}

export interface IEmployeeResponse{
    id:number,
    employee_name:string,
    post:IPost,
    department:IDepartment,
    dismissed:boolean
}

export interface IEmployeeFormValues{
    id:number,
    employee_name:string,
    post:IPostOption,
    department:IDepartmentOption,
    dismissed:boolean
}

export interface IEmployeeOption{
    value: number;
    label: string;
}