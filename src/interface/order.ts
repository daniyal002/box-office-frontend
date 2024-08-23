import { IEmployeeOption, IEmployeeResponse } from "./employee";
import { IRouteOption, IRouteResponse } from "./route";
import { IStatus, IStatusOption } from "./status";
import { IUserOption, IUserResponse } from "./user";

export interface IOrderRequset {
  id?: number;
  employee_id: number;
  user_id?: number;
  order_description: string;
  order_summ: number;
  route_id: number;
  status_id?: number;
  order_note: string;
  current_route_step_id: number;
}


export interface IOrderResponse {
    id: number;
    employee: IEmployeeResponse;
    user: IUserResponse;
    order_description: string;
    order_summ: number;
    route: IRouteResponse;
    status: IStatus;
    order_note?: string;
    current_route_step_id: number;
    images?:IOrderImage[]
}

export interface IOrderImage{
    id:number,
    image_src:string,
}



export interface IOrderFormValues {
    id: number;
    employee: IEmployeeOption;
    user: IUserOption;
    order_description: string;
    order_summ: number;
    route: IRouteOption;
    status: IStatusOption;
    order_note?: string;
    current_route_step_id: number;
    images?:IOrderImage[]
}