"use client";
import Link from "next/link";
import style from "./OrderRoutes.module.scss";
import { Toaster } from "sonner";
import {  useOrderRoute } from "@/hook/orderHook";
import OrderRoutesTable from "./OrderRoutesTable";


export default function OrderRoutes() {
  const { orderRouteData } = useOrderRoute();
  const onEdit = (id: number) => console.log(id);

  return (
    <div className={style.orderList}>
      <Toaster />
      <div className={style.orderListButton}>
        <Link href={"/order/newOrder"} className={style.newOrderButton}>
          Создать заявку
        </Link>
      </div>
        <OrderRoutesTable orderRouteData={orderRouteData} onEdit={onEdit} />
    </div>
  );
}
