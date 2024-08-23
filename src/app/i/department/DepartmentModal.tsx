import { Modal, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import style from "./DepartmentModal.module.scss";
import { IDepartment } from "@/interface/department";
import {
  useCreateDepartmentMutation,
  useDepartmentData,
  useUpdateDepartmentMutation,
} from "@/hook/departmentHook";

interface Props {
  type: "Добавить" | "Изменить";
  departmentId?: number;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function DepartmentModal({
  type,
  departmentId,
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDepartment>({ mode: "onChange" });
  const { departmentData } = useDepartmentData();
  const { mutate: createDepartmentMutation } = useCreateDepartmentMutation();
  const { mutate: updateDepartmentMutation } = useUpdateDepartmentMutation();

  const onSubmit: SubmitHandler<IDepartment> = (data) => {
    type === "Добавить"
      ? createDepartmentMutation(data)
      : updateDepartmentMutation(data);
    reset();
    setIsModalOpen(false);
  };

  const itemDepartmentData = departmentData?.find(
    (department) => department.id === departmentId
  );

  useEffect(() => {
    if (departmentId === undefined) {
      reset({
        department_name: undefined,
      });
    } else if (type === "Изменить" && itemDepartmentData) {
      reset({
        id: itemDepartmentData?.id,
        department_name: itemDepartmentData?.department_name,
      });
    }
  }, [reset, type, departmentId, itemDepartmentData]);

  return (
    <Modal
      title={`${type} подразделение`}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        reset();
      }}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={style.departmentForm}>
        <div className={style.formItem}>
          <label className={style.formItemLabel}>Название подразделения</label>
          <input
            type="text"
            placeholder="Подразделение"
            className={style.departmentName}
            {...register("department_name", {
              required: { message: "Введите подразделение", value: true },
            })}
          />
        </div>
        {errors && (
          <p className={style.error}>{errors.department_name?.message}</p>
        )}

        <button type="submit" className={style.departmentNameSubmit}>
          {type}
        </button>
      </form>
    </Modal>
  );
}
