import { axiosWidthAuth } from "@/api/interseptors"
import { IEmployeeRequest, IEmployeeResponse } from "@/interface/employee"

export const employeeService = {
    async getEmployee (){
        const response = await axiosWidthAuth.get<IEmployeeResponse[]>('employees')
        return response.data
    },

    async addEmployee(data:IEmployeeRequest){
        const response = await axiosWidthAuth.post<IEmployeeResponse>('employees',data)
        return response.data
    },

    async updateEmployee(data:IEmployeeRequest){
        const response = await axiosWidthAuth.put<IEmployeeResponse>(`employees/${data.id}`,data)
        return response.data
    },

    async deleteEmployeeById(data:IEmployeeRequest){
        const response = await axiosWidthAuth.delete<string>(`employees/${data.id}`)
        return response.data
    }
}