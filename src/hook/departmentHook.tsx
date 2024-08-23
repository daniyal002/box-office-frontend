import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { IDepartment } from "@/interface/department";
import { depatmentService } from "@/services/depatment.service";

export const useDepartmentData = () => {
  const {
    data: departmentData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Departments"],
    queryFn: depatmentService.getDepatment,
    staleTime: Infinity,
  });
  return { departmentData, isLoading, error };
};

export const useCreateDepartmentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createDepartment"],
    mutationFn: (data: IDepartment) => depatmentService.addDepatment(data),
    onSuccess: (newDepatment) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Departments"], (oldData: IDepartment[] | undefined) => {
        if (!oldData) return [];
        return [...oldData, newDepatment];
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useUpdateDepartmentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateDepartments"],
    mutationFn: (data: IDepartment) => depatmentService.updateDepatment(data),
    onSuccess: (updatedDepatment, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Departments"], (oldData: IDepartment[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((depatment) =>
          depatment.id === variables.id ? variables : depatment
        );
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useDeleteDepartmentMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteDepartments"],
    mutationFn: (data: IDepartment) => depatmentService.deleteDepatmentById(data),
    onSuccess: (updatedDepatment, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Departments"], (oldData: IDepartment[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((depatment) => depatment.id !== variables.id);
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};
