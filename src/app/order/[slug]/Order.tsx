'use client'
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Select, Upload } from 'antd';
import { IOrderFormValues, IOrderRequset, IOrderResponse } from '@/interface/order';
import { useCreateOrderMutation, useAddImagesOrderMutation, useUpdateOrderMutation, useUpdateImagesOrderMutation, useOrderUserData, useOrderData, useOrderByIdData } from '@/hook/orderHook';
import style from './Order.module.scss';
import { useEmployeeData } from '@/hook/employeeHook';
import { useRouteData } from '@/hook/routeHook';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import OpenImage from '@/components/OpenImage/OpenImage';

interface Props {
  orderId?: string;
}

const Order = ({ orderId }: Props) => {
  const { mutate: createOrder } = useCreateOrderMutation();
  const { mutate: updateOrder } = useUpdateOrderMutation()
  const { mutate: addImages } = useAddImagesOrderMutation();
  const { mutate: updateImages } = useUpdateImagesOrderMutation();
  const { orderByIdData } = useOrderByIdData(Number(orderId));
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<IOrderFormValues>({mode:'onChange'});
  
  const { employeeData } = useEmployeeData();
  const { routeData } = useRouteData();
  
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [itemOrderData,setItemOrderData] = useState<IOrderResponse>()

  useEffect(()=>{
    console.log(itemOrderData)
    if(orderByIdData){
      setItemOrderData(orderByIdData)
    }else if(orderId === "newOrder"){
      setItemOrderData(undefined)
    }
  },[itemOrderData,orderByIdData,orderId])

  const onSubmit: SubmitHandler<IOrderFormValues> = (data) => {
    console.log(fileList)
    if(orderId === 'newOrder'){

    const newOrder:IOrderRequset = {
        employee_id:data.employee.value,
        order_description:data.order_description,
        route_id:data.route.value,
        order_note:data.order_note as string,
        order_summ:Number(data.order_summ),
        current_route_step_id:data.current_route_step_id
    }

    createOrder(newOrder, {
      onSuccess: (newOrder) => {
        if (fileList.length > 0) {
          const files = fileList.map(file => file.originFileObj as RcFile);
          addImages({ orderId: newOrder.id, files });
        }
      },
    });

  } else if (orderId !== 'newOrder'){
   const newUpdateOrder:IOrderRequset = {
        id:Number(orderId),
        employee_id:data.employee.value,
        order_description:data.order_description,
        order_note:data.order_note as string,
        order_summ:Number(data.order_summ),
        current_route_step_id:data.current_route_step_id
    }
    console.log(fileList)

    updateOrder(newUpdateOrder, {
      onSuccess: (updateOrder) => {

        if (fileList.length > 0) {
          const files = fileList.map(file => file.originFileObj as RcFile);
          updateImages({ orderId: updateOrder.id, files });
        }
      },
    });
  }

  };

  useEffect(() => {
    if (orderId === 'newOrder') {
      reset({
        employee: undefined,
        route: undefined,
        order_description: undefined,
        order_note: undefined,
        order_summ: undefined,
        current_route_step_id: undefined,
        images: undefined,
      });
      // setFileList([]);
    } else if (orderId !== 'newOrder' && itemOrderData) {
      console.log(itemOrderData)
      reset({
        employee: {
          value: itemOrderData?.employee?.id,
          label: itemOrderData?.employee?.employee_name,
        },
        route: {
          value: itemOrderData?.route?.id,
          label: itemOrderData?.route?.route_name,
        },
        order_description: itemOrderData.order_description,
        order_note: itemOrderData.order_note,
        order_summ: itemOrderData.order_summ,
        current_route_step_id: itemOrderData.current_route_step_id,
        images: itemOrderData.images,
      });
    }
  }, [reset, orderId, itemOrderData]);

  const optionsEmployee = employeeData?.map((employee) => ({
    value: employee.id,
    label: employee.employee_name,
  }));

  const optionsRoute = routeData?.map((route) => ({
    value: route.id,
    label: route.route_name,
  }));

  // const handleFileChange = (info: { fileList: UploadFile[] }) => {
  //   console.log(fileList)
  //   setFileList((prevFileList) => [...info.fileList, ...prevFileList.filter((file) => file.status === 'done')]);
  // };

  const handleFileChange = (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.orderForm}>
      <div className={style.formItem}>
        <label className={style.formItemLabel}>Выберите сотрудника</label>
        <Controller
          control={control}
          name="employee"
          rules={{
            required: { message: "Выберите сотрудника", value: true },
          }}
          render={({ field }) => (
            <Select
              {...field}
              options={optionsEmployee}
              onChange={(value, option) =>
                  // @ts-ignore: Unreachable code error
                field.onChange({ value: value, label: option.label })
              }
              placeholder="Cотрудник"
            />
          )}
        />
      </div>
      {errors && <p className={style.error}>{errors.employee?.message}</p>}

      <div className={style.formItem}>
        <label className={style.formItemLabel}>Выберите маршрут</label>
        <Controller
          control={control}
          name="route"
          rules={{
            required: { message: "Выберите маршрут", value: true },
          }}
          render={({ field }) => (
            <Select
              {...field}
              options={optionsRoute}
              onChange={(value, option) =>
                  // @ts-ignore: Unreachable code error
                field.onChange({ value: value, label: option.label })
              }
              placeholder="Маршрут"
            />
          )}
        />
      </div>
      {errors && <p className={style.error}>{errors.route?.message}</p>}

      <div className={style.formItem}>
        <label className={style.formItemLabel}>Описание заявки</label>
        <textarea
          placeholder="Описание"
          className={style.orderName}
          
          {...register("order_description", {
            required: {
              message: "Введите описание",
              value: true,
            },
          })}
        />
      </div>
      {errors.order_description && <p className={style.error}>{errors.order_description?.message}</p>}

      <div className={style.formItem}>
        <label className={style.formItemLabel}>Сумма</label>
        <input
          type="text"
          placeholder="Сумма"
          className={style.orderName}
          {...register("order_summ", {
            required: {
              message: "Введите сумму",
              value: true,
            },
            pattern: {value: /^[1-9][0-9]*$/, message: 'Вводить можно только положительные цифры',},
          })}
        />
      </div>
      {errors.order_summ && <p className={style.error}>{errors.order_summ?.message}</p>}

      <div className={style.formItem}>
        <label className={style.formItemLabel}>Загрузите изображения</label>
        <Upload
          multiple
          listType="picture"
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={() => false} // Отключаем автоматическую загрузку, чтобы отправлять файлы вручную
        >
          <Button icon={<UploadOutlined />}>Выбрать файлы</Button>
        </Upload>
        
        <div className={style.images}>

        {itemOrderData?.images && itemOrderData.images.map((img,index) => (
          <OpenImage img={img} key={index}/>
        ))}
        </div>

      </div>

      <div className={style.formItem}>
        <label className={style.formItemLabel}>Примечание</label>
        <textarea
          placeholder="Примечание"
          className={style.orderName}
          {...register("order_note")}
        />
      </div>

      <Button type="primary" htmlType="submit" className={style.orderSubmit}>
        {orderId === "newOrder" ? "Создать заявку" : "Обновить заявку"}
      </Button>
    </form>
  );
};

export default Order;