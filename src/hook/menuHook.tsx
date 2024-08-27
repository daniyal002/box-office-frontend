import { getAccessToken } from "@/services/auth-token.service";
import { menuService } from "@/services/menu.service";
import { useQuery } from "@tanstack/react-query";

export const useMenuData = (accessToken:string) => {
    
    const {
      data: menuData,
      isLoading,
      error,
      isSuccess,
      status
    } = useQuery({
      queryKey: ["Menu"],
      queryFn: () => menuService.getMenu(accessToken),
    });
    return { menuData, isLoading, error,isSuccess,status };
  };