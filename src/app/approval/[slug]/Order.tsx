'use client'
import React, { useEffect, useState } from 'react';
import { IOrderResponse } from '@/interface/order';
import { useOrderByIdData } from '@/hook/orderHook';
import style from './Order.module.scss';
import OpenImage from '@/components/OpenImage/OpenImage';
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface Props {
  orderId?: string;
}

const Order = ({ orderId }: Props) => {
  const { orderByIdData } = useOrderByIdData(Number(orderId));
  const [itemOrderData,setItemOrderData] = useState<IOrderResponse>()

  useEffect(()=>{
    if(orderByIdData){
      setItemOrderData(orderByIdData)
    }else if(orderId === "newOrder"){
      setItemOrderData(undefined)
    }
  },[itemOrderData,orderByIdData,orderId])


  return (
    <div className={style.orderForm}>
      <div className={style.formItemMain}>
      <div className={style.formItem}>
        <label className={style.formItemLabel}>Cотрудник:</label>
        <Input type="text"  defaultValue={itemOrderData?.employee.employee_name} disabled value={itemOrderData?.employee.employee_name} style={{color:'#1d6fb8', fontSize:"16px"}}/>
      </div>

      <div className={style.formItem}>
        <label className={style.formItemLabel}>Маршрут: </label>
        <Input type="text"  defaultValue={itemOrderData?.route.route_name} disabled value={itemOrderData?.route.route_name} style={{color:'#1d6fb8', fontSize:"16px"}}/>
      </div>

      <div className={style.formItem}>
        <label className={style.formItemLabel}>Сумма: </label>
        <Input type="text"  defaultValue={itemOrderData?.order_summ} disabled value={itemOrderData?.order_summ} style={{color:'#1d6fb8', fontSize:"16px"}}/>
      </div>
      </div>

      <div className={style.formItem}>
        <label className={style.formItemLabel}>Описание заявки: </label>
        <TextArea defaultValue={itemOrderData?.order_description} value={itemOrderData?.order_description} disabled style={{color:'#1d6fb8', fontSize:"16px"}}/>
      </div>


      <div className={style.formItem}>
        <label className={style.formItemLabel}>Изображения</label>
        <div className={style.images}>
        {itemOrderData?.images && itemOrderData.images.map((img,index) => (
          <OpenImage img={img} key={index}/>
        ))}
        </div>
      </div>
      <div className={style.formItem}>
        <label className={style.formItemLabel}>Примечание: </label>
        <TextArea defaultValue={itemOrderData?.order_note} value={itemOrderData?.order_note} disabled style={{color:'#1d6fb8', fontSize:"16px"}}/>
      </div>

    </div>
  );
};

export default Order;