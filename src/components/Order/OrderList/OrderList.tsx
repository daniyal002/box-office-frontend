"use client";
import OrderListTable from "./OrderListTable";
import Link from "next/link";
import style from "./OrderList.module.scss";
import { Toaster } from "sonner";
import { IOrderResponse } from "@/interface/order";

interface Props{
  orderData:IOrderResponse[]
}

export default function OrderList({orderData}:Props) {

  return (
    <div className={style.orderList}>
      <Toaster />
      <div className={style.orderListButton}>
        <Link href={"/order/newOrder"} className={style.newOrderButton}>
          Создать заявку
        </Link>
      </div>
        <OrderListTable OrderData={orderData}/>
    </div>
  );
}
