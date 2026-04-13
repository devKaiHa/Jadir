import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { BlogsEndPoint } from "../Api/GlobalData";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery,
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (query = "") => `${BlogsEndPoint}?${query}`,
      providesTags: ["Blog"],
    }),

    getOneBlog: builder.query({
      query: (id) => `${BlogsEndPoint}/${id}`,
      providesTags: ["Blog"],
    }),

    postBlog: builder.mutation({
      query: (formData) => ({
        url: BlogsEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BlogsEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${BlogsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetOneBlogQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
