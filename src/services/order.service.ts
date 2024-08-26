import { axiosWidthAuth } from "@/api/interseptors"
import { IOrderRequset, IOrderResponse } from "@/interface/order"

export const orderService = {
    async getOrder (){
        const response = await axiosWidthAuth.get<IOrderResponse[]>('orders')
        return response.data
    },

    async getOrderUser (){
        const response = await axiosWidthAuth.get<IOrderResponse[]>('orders/user')
        return response.data
    },

    async getOrderByID (orderId:number){
        if(Number.isNaN(orderId)){
            return null
        }
        const response = await axiosWidthAuth.get<IOrderResponse>(`orders/${orderId}`)
        return response.data
    },

    async getOrderRoute (){
        const response = await axiosWidthAuth.get<IOrderResponse[]>('orders/approval')
        return response.data
    },

    async addOrder(data:IOrderRequset){
        const response = await axiosWidthAuth.post<IOrderResponse>('orders',data)
        return response.data
    },

    async updateOrder(data:IOrderRequset){
        const response = await axiosWidthAuth.put<IOrderResponse>(`orders/${data.id}`,data)
        return response.data
    },

    async deleteOrderById(data:IOrderRequset){
        const response = await axiosWidthAuth.delete<string>(`orders/${data.id}`)
        return response.data
    },

    async agreedOrderById(orderId:number){
        const response = await axiosWidthAuth.post<string>(`orders/${orderId}/agreed`)
        return response.data
    },

    async rejectedOrderById(orderId:number){
        const response = await axiosWidthAuth.post<string>(`orders/${orderId}/rejected`)
        return response.data
    },

    async resetOrderById(orderId:number){
        const response = await axiosWidthAuth.post<string>(`orders/${orderId}/reset`)
        return response.data
    },

    async addImageOrderById(orderId:number,files: File[]){
        const formData = new FormData();

        files.forEach(file => {
          formData.append('images', file);
        });
        
        const response = await axiosWidthAuth.post<string>(`orders/${orderId}/images`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        return response.data
    },

    async updateImageOrderById(orderId:number, files: File[]){
        const formData = new FormData();

        files.forEach(file => {
          formData.append('images', file);
        });

        const response = await axiosWidthAuth.put<string>(`orders/${orderId}/images`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        return response.data
    },
}