import { axiosWidthAuth } from "@/api/interseptors"
import { IMenu } from "@/interface/menu"
import Cookies from 'js-cookie'


export const menuService = {
    async getMenu (token:string){
        console.log(token)
        if(token){
            const response = await axiosWidthAuth.get<IMenu[]>('menu')
            if(response.data){
                Cookies.set('path',JSON.stringify(response?.data))
            }
            return response.data
        }
       
    },
}