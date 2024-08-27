import { useCashData, useDepositeCashMutation, useWithdrawCashMutation } from '@/hook/cashHook';
import { ICash } from '@/interface/cash';
import { Modal } from 'antd';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './CashModal.module.scss'

interface Props {
    type: "Deposite" | "Withdraw";
    cashId?: number;
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
  }

export default function CashModal({isModalOpen,setIsModalOpen,type,cashId}:Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<ICash>({ mode: "onChange" });
      const { cashData } = useCashData();
      const { mutate: depositeCashMutation } = useDepositeCashMutation();
      const { mutate: withdrawCashMutation } = useWithdrawCashMutation();
      const onSubmit: SubmitHandler<ICash> = (data) => {
        
        type === "Deposite" ? depositeCashMutation({...data,cash_summ:Number(data.cash_summ)}) : withdrawCashMutation({...data,cash_summ:Number(data.cash_summ)});
        reset();
        setIsModalOpen(false);
      };
      const itemCashData = cashData?.find((cash) => cash.id === cashId);
    
      useEffect(() => {
          reset({
            id: itemCashData?.id,
            cash_name: itemCashData?.cash_name,
            cash_summ: itemCashData?.cash_summ,
          });
      }, [reset, type, cashId, itemCashData]);
    
      return (
        <>
          <Modal
            title={type === "Deposite" ? `Внесение ДС в ${itemCashData?.cash_name}` : `Выдача ДС из ${itemCashData?.cash_name}` }
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
              reset();
            }}
            footer={null}
          >
            <form onSubmit={handleSubmit(onSubmit)} className={style.cashForm}>
              <div className={style.formItem}>
                <label className={style.formItemLabel}>Сумма</label>
                <input
                  type="text"
                  placeholder="Сумма"
                  className={style.cashName}
                  {...register("cash_summ", {
                    required: { message: "Введите сумму", value: true },
                    pattern: {value: /^[1-9][0-9]*$/, message: 'Вводить можно только положительные цифры',},
                  })}
                />
              </div>
              {errors.cash_summ && <p className={style.error}>{errors.cash_summ?.message}</p>}
              <button type="submit" className={style.cashNameSubmit}>
                {type}
              </button>
            </form>
          </Modal>
        </>
      );
}
