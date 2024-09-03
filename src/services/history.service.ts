import { axiosWidthAuth } from "@/api/interseptors"
import { IHistory } from "@/interface/history"

export const historyService = {
    async getHistory (order_id:number) {
        const response = await axiosWidthAuth.get<IHistory[]>(`history/${order_id}`)
        return response.data
    }
}