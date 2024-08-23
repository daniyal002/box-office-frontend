import { IErrorResponse } from "@/interface/error";
import { IOrderRequset, IOrderResponse } from "@/interface/order";
import { orderService } from "@/services/order.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError } from "axios";


export const useOrderData = () => {
    const {
      data: orderData,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["Orders"],
      queryFn: orderService.getOrder,
    //   staleTime: Infinity,
    });
    return { orderData, isLoading, error };
  };

  export const useCreateOrderMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['createOrder'],
      mutationFn: (data: IOrderRequset) => orderService.addOrder(data),
      onSuccess: (newOrder) => {
        queryClient.setQueryData(['orders'], (oldData: IOrderResponse[] | undefined) => {
          return oldData ? [...oldData, newOrder] : [newOrder];
        });
        message.success('Заявка успешно создана');
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        message.error(error?.response?.data?.detail);
      },
    });
  };

  export const useUpdateOrderMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['updateOrder'],
      mutationFn: (data: IOrderRequset) => orderService.updateOrder(data),
      onSuccess: (updatedOrder, variables) => {
        queryClient.setQueryData(['orders'], (oldData: IOrderResponse[] | undefined) => {
          return oldData ? oldData.map(order => order.id === variables.id ? updatedOrder : order) : [];
        });
        message.success('Заявка успешно обновлена');
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        message.error(error?.response?.data?.detail);
      },
    });
  };

  export const useDeleteOrderMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['deleteOrder'],
      mutationFn: (data: IOrderRequset) => orderService.deleteOrderById(data),
      onSuccess: (_, variables) => {
        queryClient.setQueryData(['orders'], (oldData: IOrderResponse[] | undefined) => {
          return oldData ? oldData.filter(order => order.id !== variables.id) : [];
        });
        message.success('Заявка успешно удалена');
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        message.error(error?.response?.data?.detail);
      },
    });
  };

  export const useAgreedOrderMutation = () => {
    return useMutation({
      mutationKey: ['agreedOrder'],
      mutationFn: (data: IOrderRequset) => orderService.agreedOrderById(data),
      onSuccess: () => {
        message.success('Заявка успешно согласована');
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        message.error(error?.response?.data?.detail);
      },
    });
  };

  export const useRejectedOrderMutation = () => {
    return useMutation({
      mutationKey: ['rejectedOrder'],
      mutationFn: (data: IOrderRequset) => orderService.rejectedOrderById(data),
      onSuccess: () => {
        message.success('Заявка успешно отклонена');
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        message.error(error?.response?.data?.detail);
      },
    });
  };

  export const useResetOrderMutation = () => {
    return useMutation({
      mutationKey: ['resetOrder'],
      mutationFn: (data: IOrderRequset) => orderService.resetOrderById(data),
      onSuccess: () => {
        message.success('Заявка успешно сброшена');
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        message.error(error?.response?.data?.detail);
      },
    });
  };

export const useAddImagesOrderMutation = () => {
  const { mutate } = useMutation({
    mutationKey: ["addImageOrder"],
    mutationFn: (data: { orderId: number; files: File[] }) =>
      orderService.addImageOrderById(data.orderId, data.files),
  });

  return { mutate };
};

export const useUpdateImagesOrderMutation = () => {
  const { mutate } = useMutation({
    mutationKey: ["updateImageOrder"],
    mutationFn: (data: { orderId: number; files: File[] }) =>
      orderService.updateImageOrderById(data.orderId, data.files),
  });

  return { mutate };
};