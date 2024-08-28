import { ILoginRequest } from "@/interface/auth";
import { authService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from 'axios';
import { IErrorResponse } from "@/interface/error";
import { useRouter,permanentRedirect } from "next/navigation";
import { message } from "antd";


export const useLogin = () => {
    const queryClient = useQueryClient();
  
	const { replace } = useRouter()
    const {mutate, isSuccess, error} = useMutation({
        mutationKey:['login'],
        mutationFn:(data:ILoginRequest) => authService.login(data),
        onSuccess(){
            replace("/")
            queryClient.clear();
        },
        onError(error:AxiosError<IErrorResponse>){
            message.error(error?.response?.data?.error);
          }  
      })

      return {mutate,isSuccess,error}
};
