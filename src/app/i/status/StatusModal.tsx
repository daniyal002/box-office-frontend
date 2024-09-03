
import { Modal, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import style from "./StatusModal.module.scss";
import { useCreateStatusMutation, useStatusData, useUpdateStatusMutation } from "@/hook/statusHook";
import { IStatus } from "@/interface/status";
import { OrderStatus } from "@/helper/orderStatusEnum";

interface Props {
  type: "Добавить" | "Изменить";
  statusId?: number;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function StatusModal({
  type,
  statusId,
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<IStatus>({ mode: "onChange" });
  const { statusData } = useStatusData();
  const { mutate: createStatusMutation } = useCreateStatusMutation();
  const { mutate: updateStatusMutation } = useUpdateStatusMutation();
  const onSubmit: SubmitHandler<IStatus> = (data) => {
    type === "Добавить" ? createStatusMutation(data) : updateStatusMutation(data);
    reset();
    setIsModalOpen(false);
  };
  const itemStatusData = statusData?.find((status) => status.id === statusId);

  useEffect(() => {
    if (statusId === undefined) {
      reset({
        status_name: undefined,
      });
    } else if (type === "Изменить") {
      reset({
        id: itemStatusData?.id,
        status_name: itemStatusData?.status_name,
      });
    }
  }, [reset, type, statusId, itemStatusData]);

  const optionOrderStatus = [{
    value: OrderStatus.APPROVED,
    label: "Согласован"
  },
  {
    value: OrderStatus.PENDING,
    label: "В ожидании"
  },
  {
    value: OrderStatus.REJECTED,
    label: "Отклонен"
  }
];

  return (
    <>
      <Modal
        title={`${type} статус`}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          reset();
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={style.statusForm}>
          <div className={style.formItem}>
            <label className={style.formItemLabel}>Название статуса</label>
            <input
              type="text"
              placeholder="Статус"
              className={style.statusName}
              {...register("status_name", {
                required: { message: "Введите статус", value: true },
              })}
            />
          </div>
          {errors.status_name && <p className={style.error}>{errors.status_name?.message}</p>}

          <div className={style.formItem}>
          <label className={style.formItemLabel}>Выберите действие</label>
          <Controller
            control={control}
            name="orderStatus"
            rules={{
              required: { message: "Выберите действие", value: true },
            }}
            render={({ field }) => (
              <Select
                {...field}
                options={optionOrderStatus}
                onChange={(value, option) =>
                  // @ts-ignore: Unreachable code error
                  field.onChange(value)
                }
                placeholder="Действие"
              />
            )}
          />
        </div>

        {errors.orderStatus && <p className={style.error}>{errors.orderStatus?.message}</p>}

          <button type="submit" className={style.statusNameSubmit}>
            {type}
          </button>
        </form>
      </Modal>
    </>
  );
}
