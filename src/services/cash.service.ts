import { axiosWidthAuth } from "@/api/interseptors"
import { ICash } from "@/interface/cash"

export const cashService = {
    async getCash (){
        const response = await axiosWidthAuth.get<ICash[]>('cashes')
        return response.data
    },

    async addCash(data:ICash){
        const response = await axiosWidthAuth.post<ICash>('cashes',data)
        return response.data
    },

    async updateCash(data:ICash){
        const response = await axiosWidthAuth.put<string>(`cashes/${data.id}`,data)
        return response.data
    },

    async deleteCashById(data:ICash){
        const response = await axiosWidthAuth.delete<string>(`cashes/${data.id}`)
        return response.data
    },

    async depositCash(data:ICash){
        const response = await axiosWidthAuth.post<ICash>(`cashes/${data.id}/deposit`,data)
        return response.data
    },

    async withdrawCash(data:ICash){
        const response = await axiosWidthAuth.post<ICash>(`cashes/${data.id}/withdraw`,data)
        return response.data
    },
}