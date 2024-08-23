import { Modal, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import style from "./UserModal.module.scss";
import {
  useEmployeeData,
} from "@/hook/employeeHook";
import { IUserFormValues, IUserRequest } from "@/interface/user";
import { useCreateUserMutation, useUpdateUserMutation, useUserData } from "@/hook/userHook";
import { useRoleData } from "@/hook/roleHook";

interface Props {
  type: "Добавить" | "Изменить";
  userId?: number;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function UserModal({
  type,
  userId,
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IUserFormValues>({ mode: "onChange" });
  const { userData } = useUserData();
  const { employeeData } = useEmployeeData();
  const { roleData } = useRoleData();

  const { mutate: createUserMutation } = useCreateUserMutation();
  const { mutate: updateUserMutation } = useUpdateUserMutation();


  const onSubmit: SubmitHandler<IUserFormValues> = (data) => {
    const itemEmployeeData = employeeData?.find(
      (employee) => employee.id === data.employee?.value
    );

    const itemRoleData = roleData?.find(
      (role) => role.id === data.role?.value
    );
    const updateUser: IUserRequest = {
      ...data,
      employee_id: itemEmployeeData?.id as number,
      role_id: itemRoleData?.id as number,
    };
    type === "Добавить"
      ? createUserMutation(updateUser)
      : updateUserMutation(updateUser);
    reset();
    setIsModalOpen(false);
  };

  const itemUserData = userData?.find(
    (user) => user.id === userId
  );


  useEffect(() => {
    if (userId === undefined) {
      reset({
        user_name:undefined,
        password:undefined,
        employee:undefined,
        role:undefined,
      });
    } else if (type === "Изменить" && itemUserData) {
      reset({
        id: itemUserData?.id,
        user_name: itemUserData.user_name,
        password: itemUserData.password,
        employee: {
          value: itemUserData?.employee?.id,
          label: itemUserData?.employee?.employee_name,
        },
        role: { 
          value: itemUserData?.role.id,
          label: itemUserData?.role.role_name,
        }
      });
    }
  }, [reset, type, userId, itemUserData]);

  const optionsEmployee = employeeData?.map((employee) => ({
    value: employee.id as number,
    label: employee.employee_name as string,
  }));

  const optionsRole = roleData?.map((role) => ({
    value: role.id as number,
    label: role.role_name as string,
  }));


  return (
    <Modal
      title={`${type} пользователя`}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        reset();
      }}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={style.userForm}>
        <div className={style.formItem}>
          <label className={style.formItemLabel}>Логин</label>
          <input
            type="text"
            placeholder="Логин"
            className={style.userName}
            {...register("user_name", {
              required: {
                message: "Введите логин",
                value: true,
              },
            })}
          />
        </div>

        {errors.user_name && <p className={style.error}>{errors.user_name?.message}</p>}

        <div className={style.formItem}>
          <label className={style.formItemLabel}>Пароль</label>
          <input
            type="password"
            placeholder="Пароль"
            className={style.userName}
            {...register("password", {
              required: {
                message: "Введите Пароль",
                value: true,
              },
            })}
          />
        </div>

        {errors.password && <p className={style.error}>{errors.password?.message}</p>}

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
                placeholder="Сотрудник"
              />
            )}
          />
        </div>

        {errors.employee && <p className={style.error}>{errors.employee?.message}</p>}

            <div className={style.formItem}>
              <label className={style.formItemLabel}>Выберите роль</label>
              <Controller
                control={control}
                name="role"
                rules={{
                  required: { message: "Выберите роль", value: true},
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsRole}
                    onChange={(value, option) =>
                      // @ts-ignore: Unreachable code error
                      field.onChange({ value: value, label: option.label })
                    }
                    placeholder="Роль"
                  />
                )}
              />
            </div>

            {errors.role && <p className={style.error}>{errors.role?.message}</p>}

        <button type="submit" className={style.userNameSubmit}>
          {type}
        </button>
      </form>
    </Modal>
  );
}
