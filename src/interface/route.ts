import { IEmployeeResponse } from "./employee";
import { IStatus } from "./status";

export interface IRouteRequest{
    id:number,
    route_name:string,
    steps?:IRouteStepRequset[]
}

export interface IRouteStepRequset{
    id:number,
    route_id:number,
    step_number:number,
    employee_id:number,
    step_number_agreed:number,
    step_number_rejected:number,
    status_id_agreed:number,
    status_id_rejected:number,
    isWithdraw?:boolean
}

export interface IRouteStepResponse{
    id:number,
    step_number:number,
    employee:IEmployeeResponse,
    step_number_agreed:number,
    step_number_rejected:number,
    status_agreed:IStatus,
    status_rejected:IStatus,
    isWithdraw?:boolean
}

export interface IRouteResponse{
    id:number,
    route_name:string,
    steps?:IRouteStepResponse[]
}

export interface IRouteOption{
    value:number,
    label:string,
}