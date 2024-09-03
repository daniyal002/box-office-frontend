import { OrderStatus } from "@/helper/orderStatusEnum";

export interface IStatus{
    id:number,
    status_name:string,
    orderStatus: OrderStatus
}

export interface IStatusOption {
    value: number;
    label: string;
}