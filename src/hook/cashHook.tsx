import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { cashService } from "@/services/cash.service";
import { ICash } from "@/interface/cash";

export const useCashData = () => {
  const {
    data: cashData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Cashes"],
    queryFn: cashService.getCash,
    staleTime: Infinity,
  });
  return { cashData, isLoading, error };
};

export const useCreateCashMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createCash"],
    mutationFn: (data: ICash) => cashService.addCash(data),
    onSuccess: (newCash) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Cashes"], (oldData: ICash[] | undefined) => {
        if (!oldData) return [];
        return [...oldData, newCash];
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useUpdateCashMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateCash"],
    mutationFn: (data: ICash) => cashService.updateCash(data),
    onSuccess: (updatedCash, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Cashes"], (oldData: ICash[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((cash) =>
          cash.id === variables.id ? variables : cash
        );
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useDeleteCashMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteCash"],
    mutationFn: (data: ICash) => cashService.deleteCashById(data),
    onSuccess: (updatedCash, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Cashes"], (oldData: ICash[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((cash) => cash.id !== variables.id);
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};
