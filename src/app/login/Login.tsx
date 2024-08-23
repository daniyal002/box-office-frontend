"use client";

import { useLogin } from "@/hook/useAuth";
import { ILoginRequest } from "@/interface/auth";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({ mode: "onChange" });
  const { mutate, error } = useLogin();
  const onSubmit: SubmitHandler<ILoginRequest> = (data) => mutate(data);
  return (
    <div className="bg-primary">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center min-vh-100">
              <div className="w-100 d-block my-5">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-5">
                    <div className="card">
                      <div className="card-body">
                        <div className="text-center mb-4 mt-3">
                          <p style={{ fontSize: "24px" }}>Документооборот</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                          <div className="form-group">
                            <label>Логин</label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Введите логин"
                              {...register("user_name", {
                                required: {
                                  value: true,
                                  message: "Логин обязательно",
                                },
                              })}
                            />
                            {errors.user_name && (
                              <p
                                style={{
                                  color: "#c93e3e",
                                  paddingLeft: "3px",
                                  marginBottom: "10px",
                                }}
                              >
                                {errors.user_name.message}
                              </p>
                            )}
                          </div>
                          <div className="form-group">
                            <label>Пароль</label>
                            <input
                              className="form-control"
                              type="password"
                              placeholder="Введите пароль"
                              {...register("password", {
                                required: {
                                  value: true,
                                  message: "Логин обязательно",
                                },
                              })}
                            />
                            {errors.password && (
                              <p
                                style={{
                                  color: "#c93e3e",
                                  paddingLeft: "3px",
                                  marginBottom: "10px",
                                }}
                              >
                                {errors.password.message}
                              </p>
                            )}
                          </div>

                          <div className="mb-3 text-center">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                            >
                              Войти
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
