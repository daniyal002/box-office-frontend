import { Modal } from 'antd'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './OrderRoutesWithdrawModal.module.scss'
import { useRejectedOrderMutation } from '@/hook/orderHook';

interface Props{
    isModalOpen:boolean,
    setIsModalOpen:any,
    orderId:number,
}

interface IRejectRespone{
    message:string
}

export default function OrderRoutesModalReject({isModalOpen,setIsModalOpen,orderId}:Props) {
    const handleOk = () => {
        setIsModalOpen(false);
      };
    const { mutate: rejectedOrderMutation } = useRejectedOrderMutation();
    
      const {
        handleSubmit,
        formState: { errors },
        reset,
        register,
      } = useForm<IRejectRespone>({ mode: "onChange" });

      const onSubmit: SubmitHandler<IRejectRespone> = (data) => {
        rejectedOrderMutation({message:data.message,orderId})
        reset();
        setIsModalOpen(false);
      };

  return (
    <Modal title="Отклонение" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)} footer={null}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.orderForm}>
          <div className={style.formItem}>
            <label className={style.formItemLabelReject}>Причина отклонения</label>
            <input
              type="text"
              placeholder="Причина"
              className={style.orderNameReject}
              {...register("message", {
                required: { message: "Введите причину отклонения", value: true },
              })}
            />
          </div>

          {errors.message && <p className={style.error}>{errors.message?.message}</p>}
          <button type="submit" className={style.orderSubmitReject}>
            Отклонить
          </button>
        </form>
  </Modal>
  )
}
