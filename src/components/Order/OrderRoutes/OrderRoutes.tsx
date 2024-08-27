"use client";
import Link from "next/link";
import style from "./OrderRoutes.module.scss";
import { Toaster } from "sonner";
import {  useOrderRoute } from "@/hook/orderHook";
import OrderRoutesTable from "./OrderRoutesTable";
import { useState } from "react";
import OrderRoutesWithdrawModal from "./OrderRoutesWithdrawModal";


export default function OrderRoutes() {
  const { orderRouteData } = useOrderRoute();
  const [orderId, setOrderId] = useState<number>()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id:number) => {
    setOrderId(id)
    setIsModalOpen(true);
  };


  return (
    <div className={style.orderList}>
      <Toaster />
        <OrderRoutesTable orderRouteData={orderRouteData} showModal={showModal} />
        <OrderRoutesWithdrawModal isModalOpen={isModalOpen} orderId={orderId as number} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
}
