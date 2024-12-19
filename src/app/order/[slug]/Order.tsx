"use client";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Select, Upload } from "antd";
import {
  IOrderFormValues,
  IOrderRequset,
  IOrderResponse,
} from "@/interface/order";
import {
  useCreateOrderMutation,
  useAddImagesOrderMutation,
  useUpdateOrderMutation,
  useUpdateImagesOrderMutation,
  useOrderByIdData,
} from "@/hook/orderHook";
import style from "./Order.module.scss";
import { useRouteData } from "@/hook/routeHook";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import OpenImage from "@/components/OpenImage/OpenImage";
import { OrderStatus } from "@/helper/orderStatusEnum";
import OrderHistory from "@/components/Order/OrderHistory/OrderHistory";
import { useHistoryData } from "@/hook/historyHook";
import { IHistory } from "@/interface/history";
import FileRenderer from "@/components/FileReader/FileReader";

interface Props {
  orderId?: string;
}

const Order = ({ orderId }: Props) => {
  const { mutate: createOrder } = useCreateOrderMutation();
  const { mutate: updateOrder } = useUpdateOrderMutation();
  const { mutate: addImages } = useAddImagesOrderMutation();
  const { mutate: updateImages } = useUpdateImagesOrderMutation();
  const { orderByIdData } = useOrderByIdData(Number(orderId));
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IOrderFormValues>({ mode: "onChange" });

  const { routeData } = useRouteData();
  const { historyData } = useHistoryData(Number(orderId));
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [itemOrderData, setItemOrderData] = useState<IOrderResponse>();
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    if (orderByIdData) {
      setItemOrderData(orderByIdData);
    } else if (orderId === "newOrder") {
      setItemOrderData(undefined);
    }
  }, [itemOrderData, orderByIdData, orderId]);

  const onSubmit: SubmitHandler<IOrderFormValues> = (data) => {
    if (orderId === "newOrder") {
      const newOrder: IOrderRequset = {
        order_description: data.order_description,
        route_id: data.route.value,
        order_note: data.order_note as string,
        order_summ: Number(data.order_summ),
        current_route_step_id: data.current_route_step_id,
      };

      createOrder(newOrder, {
        onSuccess: (newOrder) => {
          if (fileList.length > 0) {
            const files = fileList.map((file) => file.originFileObj as RcFile);
            addImages({ orderId: newOrder.id, files });
          }
        },
      });
    } else if (orderId !== "newOrder") {
      const newUpdateOrder: IOrderRequset = {
        id: Number(orderId),
        order_description: data.order_description,
        order_note: data.order_note as string,
        order_summ: Number(data.order_summ),
        current_route_step_id: data.current_route_step_id,
      };

      updateOrder(newUpdateOrder, {
        onSuccess: (updateOrder) => {
          if (fileList.length > 0) {
            const files = fileList.map((file) => file.originFileObj as RcFile);
            updateImages({ orderId: updateOrder.id, files });
          }
        },
      });
    }
  };

  useEffect(() => {
    if (orderId === "newOrder") {
      reset({
        route: undefined,
        order_description: undefined,
        order_note: undefined,
        order_summ: undefined,
        current_route_step_id: undefined,
        images: undefined,
      });
      // setFileList([]);
    } else if (orderId !== "newOrder" && itemOrderData) {
      reset({
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

  const optionsRoute = routeData?.map((route) => ({
    value: route.id,
    label: route.route_name,
  }));

  const handleFileChange = (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList);
  };

  return (
    <>
      <Button onClick={() => setToggle(!toggle)} className={style.toggle}>
        {toggle ? "Заявка" : "История"}
      </Button>
      {toggle ? (
        <OrderHistory historyData={historyData as IHistory[]} />
      ) : (
        <>
        <h2>{orderByIdData?.employee.employee_name}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.orderForm}>
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
          {errors.order_description && (
            <p className={style.error}>{errors.order_description?.message}</p>
          )}

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
                pattern: {
                  value: /^[1-9][0-9]*$/,
                  message: "Вводить можно только положительные цифры",
                },
              })}
            />
          </div>
          {errors.order_summ && (
            <p className={style.error}>{errors.order_summ?.message}</p>
          )}

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
              {itemOrderData?.images &&
                itemOrderData.images.map((fileUrl, index) => (
                  <FileRenderer key={index} fileUrl={fileUrl} />
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

          {orderId === "newOrder" ? (
            <Button
              type="primary"
              htmlType="submit"
              className={style.orderSubmit}
            >
              Создать заявку
            </Button>
          ) : (
            (orderByIdData?.status?.orderStatus === OrderStatus.PENDING ||
              orderByIdData?.status?.orderStatus === OrderStatus.REJECTED) && (
              <Button
                type="primary"
                htmlType="submit"
                className={style.orderSubmit}
              >
                Обновить заявку
              </Button>
            )
          )}
        </form>
        </>
      )}
    </>
  );
};

export default Order;
