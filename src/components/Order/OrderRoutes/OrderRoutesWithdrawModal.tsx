import { useCashData, useWithdrawCashMutation } from "@/hook/cashHook";
import { useAgreedOrderMutation, useOrderData, useOrderRoute } from "@/hook/orderHook";
import { ICash, ICashFormValues } from "@/interface/cash";
import { Modal, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import style from './OrderRoutesWithdrawModal.module.scss'

interface Props {
  orderId: number;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function OrderRoutesWithdrawModal({
  orderId,
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ICashFormValues>({ mode: "onChange" });
  const { cashData } = useCashData();
  const {orderRouteData} = useOrderRoute()
  const { mutate: withdrawCashMutation } = useWithdrawCashMutation();
  const { mutate: agreedOrderMutation } = useAgreedOrderMutation();
  const onSubmit: SubmitHandler<ICashFormValues> = (data) => {
    const itemCashData = cashData?.find((cash) => cash.id === data.cash.value);
    const itemOrderData = orderRouteData?.find((order) => order.id === orderId)
    withdrawCashMutation({...itemCashData,cash_summ:itemOrderData?.order_summ} as ICash,{onSuccess: () => {
        agreedOrderMutation({
            id:itemOrderData?.id,
              current_route_step_id:itemOrderData?.current_route_step_id as number,
              employee_id:itemOrderData?.employee.id as number,
              order_description:itemOrderData?.order_description as string,
              order_note:itemOrderData?.order_note as string,
              order_summ:itemOrderData?.order_summ as number,
              route_id:itemOrderData?.route.id,
              status_id:itemOrderData?.status.id,
              user_id:itemOrderData?.user.id,
        })
    }

    })
    reset();
    setIsModalOpen(false);
  };
  const itemOrderData = orderRouteData?.find((order) => order.id === orderId)



  useEffect(() => {
    reset({
      cash: {
        value: undefined,
        label: undefined,
      },
    });
  }, [reset, orderId]);

  const optionsCash = cashData?.map((cash) => ({
    value: cash.id as number,
    label: cash.cash_name as string,
  }));

  return (
    <>
      <Modal
        title={`Выдача ДС по заявке: ${orderId}\nна сумму: ${itemOrderData?.order_summ}`}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          reset();
        }}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={style.orderForm}>
          <div className={style.formItem}>
            <label className={style.formItemLabel}>Выберите кассу</label>
            <Controller
              control={control}
              name="cash"
              rules={{
                required: { message: "Выберите кассу", value: true },
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsCash}
                  onChange={(value, option) =>
                    // @ts-ignore: Unreachable code error
                    field.onChange({ value: value, label: option.label })
                  }
                  placeholder="Касса"
                />
              )}
            />
          </div>

          {errors && <p className={style.error}>{errors.cash?.message}</p>}
          <button type="submit" className={style.orderSubmit}>
            Выдать
          </button>
        </form>
      </Modal>
    </>
  );
}
