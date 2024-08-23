import { axiosWidthAuth } from "@/api/interseptors"
import { IRole } from "@/interface/role"

export const roleService = {
    async getRole (){
        const response = await axiosWidthAuth.get<IRole[]>('roles')
        return response.data
    },

    async addRole(data:IRole){
        const response = await axiosWidthAuth.post<IRole>('roles',data)
        return response.data
    },

    async updateRole(data:IRole){
        const response = await axiosWidthAuth.put<string>(`roles/${data.id}`,data)
        return response.data
    },

    async deleteRoleById(data:IRole){
        const response = await axiosWidthAuth.delete<string>(`roles/${data.id}`)
        return response.data
    }
}