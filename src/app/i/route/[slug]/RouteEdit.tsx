'use client'
import { Modal, Select } from "antd";
import React, { useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import style from "./RouteEdit.module.scss";
import { useEmployeeData } from "@/hook/employeeHook";
import { IRouteRequest } from "@/interface/route";
import {
  useCreateRouteMutation,
  useRouteData,
  useUpdateRouteMutation,
} from "@/hook/routeHook";
import { useStatusData } from "@/hook/statusHook";
import { useRouter } from "next/navigation";

interface Props {
  routeId?: string;
}

export default function RouteEdit({
  routeId,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    getValues,
  } = useForm<IRouteRequest>({ mode: "onChange" });
  const { replace } = useRouter()
  const { routeData } = useRouteData();
  const { employeeData } = useEmployeeData();
  const { statusData } = useStatusData();

  const { mutate: createRouteMutation } = useCreateRouteMutation();
  const { mutate: updateRouteMutation } = useUpdateRouteMutation();

  const watchStep = watch("steps");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps", // Имя массива шагов
  });

  const onSubmit: SubmitHandler<IRouteRequest> = (data) => {
    const updateRoute: IRouteRequest = {
      ...data,
      steps: data?.steps?.map((step) => ({
        employee_id: step.employee_id,
        id: step.id,
        route_id: step.route_id,
        status_id_agreed: step.status_id_agreed,
        status_id_rejected: step.status_id_rejected,
        step_number: step.step_number,
        step_number_agreed: step.step_number_agreed || 0,
        step_number_rejected: step.step_number_rejected || 0,
        isWithdraw:step.isWithdraw
      })),
    };
    !isNaN(Number(routeId))   ? updateRouteMutation(updateRoute) : createRouteMutation(data);
    reset();
    replace('/i/route');
  };

  const itemRouteData = routeData?.find((route) => route.id === Number(routeId));

  useEffect(() => {
    if (routeId === 'newRoute') {
      reset({
        route_name: undefined,
        steps: undefined,
      });
    } else if (!isNaN(Number(routeId)) && itemRouteData) {
      reset({
        id: itemRouteData?.id,
        route_name: itemRouteData?.route_name,
        steps: itemRouteData?.steps,
      });
    }
  }, [reset, routeId, itemRouteData]);

  const optionsEmployee = employeeData?.map((employee) => ({
    value: employee.id as number,
    label: employee.employee_name as string,
  }));

  const optionsStatus = statusData?.map((status) => ({
    value: status.id as number,
    label: status.status_name as string,
  }));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.routeForm}>
        <div className={style.formItem}>
          <label className={style.formItemLabel}>Название маршрута</label>
          <input
            type="text"
            placeholder="Маршрут"
            className={style.routeName}
            {...register("route_name", {
              required: {
                message: "Введите маршрут",
                value: true,
              },
            })}
          />
        </div>

        {errors.route_name && (
          <p className={style.error}>{errors.route_name?.message}</p>
        )}

        <div className={style.formSteps}>
          {fields.map((field, index) => (
            <div key={field.id} className={style.formItem}>
              <label className={style.formItemLabel}>
                Шаг {getValues(`steps.${index}.step_number`)}
              </label>
              <input
                type="number"
                placeholder="Номер шага"
                className={style.routeName}
                {...register(`steps.${index}.step_number`, {
                  required: {
                    message: "Введите номер шага",
                    value: true,
                  },
                  valueAsNumber: true,
                })}
              />
              <div className={style.formItem}>
                <label className={style.formItemLabel}>
                  Выберите сотрудника
                </label>

                <Controller
                  control={control}
                  name={`steps.${index}.employee_id`}
                  rules={{
                    required: {
                      message: "Выберите сотрудника",
                      value: true,
                    },
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsEmployee}
                      placeholder="Сотрудник"
                      className={style.select}
                    />
                  )}
                />
              </div>

              <div className={style.formItem}>
                <label className={style.formItemLabel}>
                  Выберите следующий номер шага
                </label>
                <Controller
                  control={control}
                  name={`steps.${index}.step_number_agreed`}
                  rules={{
                    required: {
                      message: "Выберите следующий номер шага",
                      value: true,
                    },
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: 0, label: "пусто" },
                        ...fields.map((step, index) => ({
                          value: Number(getValues(`steps.${index}.step_number`)),
                          label: `Шаг ${getValues(`steps.${index}.step_number`)}`,
                        })).filter((_, stepIndex) => stepIndex !== index)
                      ]}
                      placeholder="следующий номер шага"
                      className={style.select}
                    />
                  )}
                />
              </div>
              <div className={style.formItem}>
                <label className={style.formItemLabel}>
                  Выберите статус согласования
                </label>

                <Controller
                  control={control}
                  name={`steps.${index}.status_id_agreed`}
                  rules={{
                    required: {
                      message: "Выберите статус согласования",
                      value: true,
                    },
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsStatus}
                      placeholder="Статус согласования"
                      className={style.select}
                    />
                  )}
                />
              </div>

              <div className={style.formItem}>
                <label className={style.formItemLabel}>
                  Выберите номер шага при отклонении
                </label>
                <Controller
                  control={control}
                  name={`steps.${index}.step_number_rejected`}
                  rules={{
                    required: {
                      message: "Выберите номер шага при отклонении",
                      value: true,
                    },
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: 0, label: "пусто" },
                        ...fields.map((step, index) => ({
                          value: Number(getValues(`steps.${index}.step_number`)),
                          label: `Шаг ${getValues(`steps.${index}.step_number`)}`,
                        })).filter((_, stepIndex) => stepIndex !== index)
                      ]}
                      placeholder="Номер шага при отклонении"
                      className={style.select}
                    />
                  )}
                />
              </div>

              <div className={style.formItem}>
                <label className={style.formItemLabel}>
                  Выберите статус отклонения
                </label>

                <Controller
                  control={control}
                  name={`steps.${index}.status_id_rejected`}
                  rules={{
                    required: {
                      message: "Выберите статус отклонения",
                      value: true,
                    },
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsStatus}
                      placeholder="Статус отклонения"
                      className={style.select}
                    />
                  )}
                />
              </div>

              <div style={{display:"flex",flexDirection:'row', alignItems:'center'}}>
                <label className={style.formItemLabel} style={{marginRight:"5px"}}>
                  Шаг выдачи ?
                </label>

               <input type="checkbox" {...register(`steps.${index}.isWithdraw`)} />
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className={style.removeStep}
              >
                Удалить шаг
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({
                id: Date.now(), // Используем временный ID
                route_id: Number(routeId) ?? 0, // Используем ID маршрута, если он известен
                step_number: fields.length + 1,
                employee_id: 0,
                step_number_agreed: 0,
                step_number_rejected: 0,
                status_id_agreed: 0,
                status_id_rejected: 0,
              })
            }
            className={style.addStep}
          >
            Добавить шаг
          </button>
        </div>

        <button type="submit" className={style.routeNameSubmit}>
          {!isNaN(Number(routeId)) ? 'Обновить' : 'Создать'}
        </button>
      </form>
    </>
  );
}
