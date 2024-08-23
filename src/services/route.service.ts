import { axiosWidthAuth } from "@/api/interseptors"
import { IRouteRequest, IRouteResponse } from "@/interface/route"

export const routeService = {
    async getRoute (){
        const response = await axiosWidthAuth.get<IRouteResponse[]>('routes')
        return response.data
    },

    async addRoute(data:IRouteRequest){
        const response = await axiosWidthAuth.post<IRouteResponse>('routes',data)
        return response.data
    },

    async updateRoute(data:IRouteRequest){
        const response = await axiosWidthAuth.put<IRouteResponse>(`routes/${data.id}`,data)
        return response.data
    },

    async deleteRouteById(data:IRouteRequest){
        const response = await axiosWidthAuth.delete<string>(`routes/${data.id}`)
        return response.data
    }
}