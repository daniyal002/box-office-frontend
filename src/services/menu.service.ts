import { axiosWidthAuth } from "@/api/interseptors"
import { IMenu } from "@/interface/menu"

export const menuService = {
    async getMenu (token:string){
        console.log(token)
        if(token === null || token === undefined){
            return null
        }
        const response = await axiosWidthAuth.get<IMenu[]>('menu')
        return response.data
    },
}