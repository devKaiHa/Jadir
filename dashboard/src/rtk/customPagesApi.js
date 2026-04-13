import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { CustomPagesEndPoint } from "../Api/GlobalData";

export const customPagesApi = createApi({
  reducerPath: "customPagesApi",
  baseQuery,
  tagTypes: ["CustomPage"],
  endpoints: (builder) => ({
    getAllCustomPages: builder.query({
      query: (query = "") => `${CustomPagesEndPoint}?${query}`,
      providesTags: ["CustomPage"],
    }),

    getOneCustomPage: builder.query({
      query: (id) => `${CustomPagesEndPoint}/${id}`,
      providesTags: ["CustomPage"],
    }),

    getCustomPageBySlug: builder.query({
      query: (slug) => `${CustomPagesEndPoint}/slug/${slug}`,
      providesTags: ["CustomPage"],
    }),

    postCustomPage: builder.mutation({
      query: (data) => ({
        url: CustomPagesEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomPage"],
    }),

    updateCustomPage: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CustomPagesEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CustomPage"],
    }),

    deleteCustomPage: builder.mutation({
      query: (id) => ({
        url: `${CustomPagesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomPage"],
    }),
  }),
});

export const {
  useGetAllCustomPagesQuery,
  useGetOneCustomPageQuery,
  useGetCustomPageBySlugQuery,
  usePostCustomPageMutation,
  useUpdateCustomPageMutation,
  useDeleteCustomPageMutation,
} = customPagesApi;
