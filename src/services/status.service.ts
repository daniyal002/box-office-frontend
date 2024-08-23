import { axiosWidthAuth } from "@/api/interseptors"
import { IStatus } from "@/interface/status"

export const statusService = {
    async getStatus (){
        const response = await axiosWidthAuth.get<IStatus[]>('statuses')
        return response.data
    },

    async addStatus(data:IStatus){
        const response = await axiosWidthAuth.post<IStatus>('statuses',data)
        return response.data
    },

    async updateStatus(data:IStatus){
        const response = await axiosWidthAuth.put<string>(`statuses/${data.id}`,data)
        return response.data
    },

    async deleteStatusById(data:IStatus){
        const response = await axiosWidthAuth.delete<string>(`statuses/${data.id}`)
        return response.data
    }
}