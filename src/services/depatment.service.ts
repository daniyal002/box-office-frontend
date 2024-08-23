import { axiosWidthAuth } from "@/api/interseptors"
import { IDepartment } from "@/interface/department"

export const depatmentService = {
    async getDepatment (){
        const response = await axiosWidthAuth.get<IDepartment[]>('departments')
        return response.data
    },

    async addDepatment(data:IDepartment){
        const response = await axiosWidthAuth.post<IDepartment>('departments',data)
        return response.data
    },

    async updateDepatment(data:IDepartment){
        const response = await axiosWidthAuth.put<string>(`departments/${data.id}`,data)
        return response.data
    },

    async deleteDepatmentById(data:IDepartment){
        const response = await axiosWidthAuth.delete<string>(`departments/${data.id}`)
        return response.data
    }
}