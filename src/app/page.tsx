'use client'
import OrderList from "@/components/Order/OrderList/OrderList";
import { useOrderUserData } from "@/hook/orderHook";
import { IOrderResponse } from "@/interface/order";

export default function Home() {
  const { orderUserData } = useOrderUserData();

  return (
    <main className='container'>
      <OrderList orderData={orderUserData as IOrderResponse[]} />
    </main>
  );
}
