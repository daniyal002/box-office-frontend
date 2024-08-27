import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { IStatus } from "@/interface/status";
import { statusService } from "@/services/status.service";

export const useStatusData = () => {
  const {
    data: statusData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Statuses"],
    queryFn: statusService.getStatus,
    staleTime: Infinity,
  });
  return { statusData, isLoading, error };
};

export const useCreateStatusMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createStatus"],
    mutationFn: (data: IStatus) => statusService.addStatus(data),
    onSuccess: (newStatus) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Statuses"], (oldData: IStatus[] | undefined) => {
        if (!oldData) return [];
        return [...oldData, newStatus];
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.error);
    },
  });
  return { mutate };
};

export const useUpdateStatusMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateStatus"],
    mutationFn: (data: IStatus) => statusService.updateStatus(data),
    onSuccess: (updatedStatus, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Statuses"], (oldData: IStatus[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((status) =>
          status.id === variables.id ? variables : status
        );
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.error);
    },
  });
  return { mutate };
};

export const useDeleteStatusMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteStatus"],
    mutationFn: (data: IStatus) => statusService.deleteStatusById(data),
    onSuccess: (updatedStatus, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Statuses"], (oldData: IStatus[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((status) => status.id !== variables.id);
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.error);
    },
  });
  return { mutate };
};
