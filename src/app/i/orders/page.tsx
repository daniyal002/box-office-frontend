'use client'
import OrderList from "@/components/Order/OrderList/OrderList";
import { useOrderData, useOrderUserData } from "@/hook/orderHook";
import { IOrderResponse } from "@/interface/order";

export default function Home() {
  const { orderData } = useOrderData();

  return (
    <main className='container'>
      <OrderList orderData={orderData as IOrderResponse[]} />
    </main>
  );
}
