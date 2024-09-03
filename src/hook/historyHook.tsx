import { historyService } from "@/services/history.service";
import { useQuery } from "@tanstack/react-query";

export const useHistoryData = (orderId:number) => {
    const {
      data: historyData,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["Historyes"],
      queryFn:() =>  historyService.getHistory(orderId),
    });
    return { historyData, isLoading, error };
  };