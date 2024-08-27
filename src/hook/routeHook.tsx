import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { routeService } from "@/services/route.service";
import { IRouteRequest, IRouteResponse } from "@/interface/route";

export const useRouteData = () => {
  const {
    data: routeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Routes"],
    queryFn: routeService.getRoute,
    staleTime: Infinity,
  });
  return { routeData, isLoading, error };
};

export const useCreateRouteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createRoute"],
    mutationFn: (data: IRouteRequest) => routeService.addRoute(data),
    onSuccess: (newRoute) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Routes"], (oldData: IRouteResponse[] | undefined) => {
        if (!oldData) return [];
        return [...oldData, newRoute];
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.error);
    },
  });
  return { mutate };
};

export const useUpdateRouteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateRoute"],
    mutationFn: (data: IRouteRequest) => routeService.updateRoute(data),
    onSuccess: (updatedRoute) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Routes"], (oldData: IRouteResponse[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((route) =>
          route.id === updatedRoute.id ? updatedRoute : route
        );
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.error);
    },
  });
  return { mutate };
};

export const useDeleteRouteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteRoute"],
    mutationFn: (data: IRouteRequest) => routeService.deleteRouteById(data),
    onSuccess: (updatedRoute, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Routes"], (oldData: IRouteResponse[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((route) => route.id !== variables.id);
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.error);
    },
  });
  return { mutate };
};
