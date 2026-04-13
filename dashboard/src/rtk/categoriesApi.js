import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { CategoriesEndPoint } from "../Api/GlobalData";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (query = "") => `${CategoriesEndPoint}?${query}`,
      providesTags: ["Category"],
    }),

    getOneCategory: builder.query({
      query: (id) => `${CategoriesEndPoint}/${id}`,
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: CategoriesEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CategoriesEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CategoriesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetOneCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
