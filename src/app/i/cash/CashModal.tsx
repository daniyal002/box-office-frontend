
import { Modal } from "antd";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./CashModal.module.scss";
import { useCashData, useCreateCashMutation, useUpdateCashMutation } from "@/hook/cashHook";
import { ICash } from "@/interface/cash";

interface Props {
  type: "Добавить" | "Изменить";
  cashId?: number;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function CashModal({
  type,
  cashId,
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICash>({ mode: "onChange" });
  const { cashData } = useCashData();
  const { mutate: createCashMutation } = useCreateCashMutation();
  const { mutate: updateCashMutation } = useUpdateCashMutation();
  const onSubmit: SubmitHandler<ICash> = (data) => {
    const newCash:ICash = {
      cash_name:data.cash_name,
      cash_summ:0
    }  
    type === "Добавить" ? createCashMutation(newCash) : updateCashMutation(data);
    reset();
    setIsModalOpen(false);
  };
  const itemCashData = cashData?.find((cash) => cash.id === cashId);

  useEffect(() => {
    if (cashId === undefined) {
      reset({
        cash_name: undefined,
        cash_summ:0,
      });
    } else if (type === "Изменить") {
      reset({
        id: itemCashData?.id,
        cash_name: itemCashData?.cash_name,
        cash_summ: itemCashData?.cash_summ,
      });
    }
  }, [reset, type, cashId, itemCashData]);

  return (
    <>
      <Modal
        title={`${type} кассы`}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          reset();
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={style.cashForm}>
          <div className={style.formItem}>
            <label className={style.formItemLabel}>Название кассы</label>
            <input
              type="text"
              placeholder="Касса"
              className={style.cashName}
              {...register("cash_name", {
                required: { message: "Введите кассу", value: true },
              })}
            />
          </div>
          {errors.cash_name && <p className={style.error}>{errors.cash_name?.message}</p>}
          <button type="submit" className={style.cashNameSubmit}>
            {type}
          </button>
        </form>
      </Modal>
    </>
  );
}
