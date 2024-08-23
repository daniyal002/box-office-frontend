import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { IEmployeeRequest, IEmployeeResponse } from "@/interface/employee";
import { employeeService } from "@/services/employee.service";

export const useEmployeeData = () => {
  const {
    data: employeeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Employees"],
    queryFn: employeeService.getEmployee,
    staleTime: Infinity,
  });
  return { employeeData, isLoading, error };
};

export const useCreateEmployeeMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: (data: IEmployeeRequest) => employeeService.addEmployee(data),
    onSuccess: (newEmployee) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Employees"], (oldData: IEmployeeResponse[] | undefined) => {
        if (!oldData) return [];
        return [...oldData, newEmployee];
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useUpdateEmployeeMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateEmployee"],
    mutationFn: (data: IEmployeeRequest) => employeeService.updateEmployee(data),
    onSuccess: (updatedEmployee) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Employees"], (oldData: IEmployeeResponse[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((employee) =>
          employee.id === updatedEmployee.id ? updatedEmployee : employee
        );
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useDeleteEmployeeMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteEmployee"],
    mutationFn: (data: IEmployeeRequest) => employeeService.deleteEmployeeById(data),
    onSuccess: (updatedEmployee, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Employees"], (oldData: IEmployeeResponse[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((employee) => employee.id !== variables.id);
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};
