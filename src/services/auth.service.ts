import { axiosClassic, axiosWidthAuth } from "@/api/interseptors";
import { saveAccessToken, saveRefreshToken } from "./auth-token.service";
import { ILoginRequest, ILoginResponse, IRefreshRequest } from "@/interface/auth";
import { menuService } from "./menu.service";
 
export const authService = {
    async login (body:ILoginRequest){
        const response = await axiosClassic.post<ILoginResponse>('/auth/login',body)

        if(response.data.accessToken){
            saveAccessToken(response.data.accessToken)
            await menuService.getMenu(response.data.accessToken)
        }

        if(response.data.refreshToken){
            saveRefreshToken(response.data.refreshToken)
        }

        return response
    },


    async refresh(data:IRefreshRequest){
      const response =  await axiosWidthAuth.post<ILoginResponse>('/auth/refresh',data)

      if(response.data.accessToken){
        saveAccessToken(response.data.accessToken)
    }

    if(response.data.refreshToken){
        saveRefreshToken(response.data.refreshToken)
    }

      return response.data
    }

} 