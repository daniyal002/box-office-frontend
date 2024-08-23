import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { postService } from "@/services/post.service";
import { IPost } from "@/interface/post";

export const usePostData = () => {
  const {
    data: postData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Posts"],
    queryFn: postService.getPost,
    staleTime: Infinity,
  });
  return { postData, isLoading, error };
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (data: IPost) => postService.addPost(data),
    onSuccess: (newPost) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Posts"], (oldData: IPost[] | undefined) => {
        if (!oldData) return [];
        return [...oldData, newPost];
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: (data: IPost) => postService.updatePost(data),
    onSuccess: (updatedPost, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Posts"], (oldData: IPost[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((post) =>
          post.id === variables.id ? variables : post
        );
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (data: IPost) => postService.deletePostById(data),
    onSuccess: (updatedPost, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Posts"], (oldData: IPost[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((post) => post.id !== variables.id);
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      message.error(error?.response?.data?.detail);
    },
  });
  return { mutate };
};
