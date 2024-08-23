import { axiosWidthAuth } from "@/api/interseptors"
import { IUserRequest, IUserResponse } from "@/interface/user"

export const userService = {
    async getUser (){
        const response = await axiosWidthAuth.get<IUserResponse[]>('users')
        return response.data
    },

    async addUser(data:IUserRequest){
        const response = await axiosWidthAuth.post<IUserResponse>('users',data)
        return response.data
    },

    async updateUser(data:IUserRequest){
        const response = await axiosWidthAuth.put<IUserResponse>(`users/${data.id}`,data)
        return response.data
    },

    async deleteUserById(data:IUserRequest){
        const response = await axiosWidthAuth.delete<string>(`users/${data.id}`)
        return response.data
    }
}