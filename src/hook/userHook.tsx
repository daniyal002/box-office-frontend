import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { userService } from "@/services/user.service";
import { IUserRequest, IUserResponse } from "@/interface/user";

export const useUserData = () => {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Users"],
    queryFn: userService.getUser,
    staleTime: Infinity,
  });
  return { userData, isLoading, error };
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (data: IUserRequest) => userService.addUser(data),
    onSuccess: (newUser) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Users"], (oldData: IUserResponse[] | undefined) => {
        if (!oldData) return [];
        return [...oldData, newUser];
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.error);
    },
  });
  return { mutate };
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (data: IUserRequest) => userService.updateUser(data),
    onSuccess: (updatedUser) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Users"], (oldData: IUserResponse[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.error);
    },
  });
  return { mutate };
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (data: IUserRequest) => userService.deleteUserById(data),
    onSuccess: (updatedUser, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Users"], (oldData: IUserResponse[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((user) => user.id !== variables.id);
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.error);
    },
  });
  return { mutate };
};
