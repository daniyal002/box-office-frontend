import { Modal, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import style from "./EmployeeModal.module.scss";
import { usePostData } from "@/hook/postHook";
import {
  useCreateEmployeeMutation,
  useEmployeeData,
  useUpdateEmployeeMutation,
} from "@/hook/employeeHook";
import { IEmployeeFormValues, IEmployeeRequest } from "@/interface/employee";
import { IPost } from "@/interface/post";
import { useDepartmentData } from "@/hook/departmentHook";

interface Props {
  type: "Добавить" | "Изменить";
  employeeId?: number;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function EmployeeModal({
  type,
  employeeId,
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    getValues,
  } = useForm<IEmployeeFormValues>({ mode: "onChange" });
  const { employeeData } = useEmployeeData();
  const { departmentData } = useDepartmentData();
  const { postData } = usePostData();

  const { mutate: createEmployeeMutation } = useCreateEmployeeMutation();
  const { mutate: updateEmployeeMutation } = useUpdateEmployeeMutation();


  const onSubmit: SubmitHandler<IEmployeeFormValues> = (data) => {
    const itemDepartmentData = departmentData?.find(
      (department) => department.id === data.department?.value
    );

    const itemPostData = postData?.find(
      (post) => post.id === data.post?.value
    );
    const updateParlor: IEmployeeRequest = {
      ...data,
      department_id: itemDepartmentData?.id as number,
      post_id: itemPostData?.id as number,
    };
    type === "Добавить"
      ? createEmployeeMutation(updateParlor)
      : updateEmployeeMutation(updateParlor);
    reset();
    setIsModalOpen(false);
  };

  const itemEmployeeData = employeeData?.find(
    (employee) => employee.id === employeeId
  );


  useEffect(() => {
    if (employeeId === undefined) {
      reset({
        employee_name: undefined,
        department: undefined,
        post: undefined,
        dismissed: false,
      });
    } else if (type === "Изменить" && itemEmployeeData) {
      reset({
        id: itemEmployeeData?.id,
        employee_name: itemEmployeeData.employee_name,
        post: {
          value: itemEmployeeData?.post?.id,
          label: itemEmployeeData?.post?.post_name,
        },
        department: {
          value: itemEmployeeData?.department.id,
          label: itemEmployeeData?.department.department_name,
        }
      });
    }
  }, [reset, type, employeeId, itemEmployeeData]);

  const optionsDepartment = departmentData?.map((department) => ({
    value: department.id as number,
    label: department.department_name as string,
  }));

  const optionsPost = postData?.map((post) => ({
    value: post.id as number,
    label: post.post_name as string,
  }));


  return (
    <Modal
      title={`${type} сотрудника`}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        reset();
      }}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={style.employeeForm}>
        <div className={style.formItem}>
          <label className={style.formItemLabel}>ФИО сотрудника</label>
          <input
            type="text"
            placeholder="ФИО"
            className={style.employeeName}
            {...register("employee_name", {
              required: {
                message: "Введите ФИО",
                value: true,
              },
            })}
          />
        </div>

        {errors && <p className={style.error}>{errors.employee_name?.message}</p>}

        <div className={style.formItem}>
          <label className={style.formItemLabel}>Выберите подразделение</label>
          <Controller
            control={control}
            name="department"
            rules={{
              required: { message: "Выберите подразделение", value: true },
            }}
            render={({ field }) => (
              <Select
                {...field}
                options={optionsDepartment}
                onChange={(value, option) =>
                  // @ts-ignore: Unreachable code error
                  field.onChange({ value: value, label: option.label })
                }
                placeholder="Подразделение"
              />
            )}
          />
        </div>

        {errors && <p className={style.error}>{errors.department?.message}</p>}

            <div className={style.formItem}>
              <label className={style.formItemLabel}>Выберите должность</label>
              <Controller
                control={control}
                name="post"
                rules={{
                  required: { message: "Выберите должность", value: true},
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsPost}
                    onChange={(value, option) =>
                      // @ts-ignore: Unreachable code error
                      field.onChange({ value: value, label: option.label })
                    }
                    placeholder="Должность"
                  />
                )}
              />
            </div>

            {errors && <p className={style.error}>{errors.post?.message}</p>}

        <button type="submit" className={style.employeeNameSubmit}>
          {type}
        </button>
      </form>
    </Modal>
  );
}
