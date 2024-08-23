import { axiosWidthAuth } from "@/api/interseptors"
import { IPost } from "@/interface/post"

export const postService = {
    async getPost (){
        const response = await axiosWidthAuth.get<IPost[]>('posts')
        return response.data
    },

    async addPost(data:IPost){
        const response = await axiosWidthAuth.post<IPost>('posts',data)
        return response.data
    },

    async updatePost(data:IPost){
        const response = await axiosWidthAuth.put<string>(`posts/${data.id}`,data)
        return response.data
    },

    async deletePostById(data:IPost){
        const response = await axiosWidthAuth.delete<string>(`posts/${data.id}`)
        return response.data
    }
}