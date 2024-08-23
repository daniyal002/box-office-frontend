
import { Modal } from "antd";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./StatusModal.module.scss";
import { useCreateStatusMutation, useStatusData, useUpdateStatusMutation } from "@/hook/statusHook";
import { IStatus } from "@/interface/status";

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
          {errors && <p className={style.error}>{errors.status_name?.message}</p>}

          <button type="submit" className={style.statusNameSubmit}>
            {type}
          </button>
        </form>
      </Modal>
    </>
  );
}
