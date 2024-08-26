"use client";
import OrderListTable from "./OrderListTable";
import Link from "next/link";
import style from "./OrderList.module.scss";
import { Toaster } from "sonner";
import {  useOrderUserData } from "@/hook/orderHook";


export default function OrderList() {
  const { orderUserData } = useOrderUserData();
  const onEdit = (id: number) => console.log(id);

  return (
    <div className={style.orderList}>
      <Toaster />
      <div className={style.orderListButton}>
        <Link href={"/order/newOrder"} className={style.newOrderButton}>
          Создать заявку
        </Link>
      </div>
        <OrderListTable OrderData={orderUserData} onEdit={onEdit} />
    </div>
  );
}
