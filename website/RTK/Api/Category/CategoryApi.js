import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BaseURL, { BlogCategoriesEndPoint } from "../../../api/GlobalData";

export const CategoryApi = createApi({
  reducerPath: "CategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: ({ keyword = "" }) =>
        `${BlogCategoriesEndPoint}/public?keyword=${keyword}`,
      providesTags: ["Blog"],
    }),

    getBlogsByCategory: builder.query({
      query: (categoryId) =>
        `${BlogCategoriesEndPoint}?categoryId=${categoryId}`,
      providesTags: ["Blog"],
    }),
  }),
});
export const { useGetAllCategoryQuery } = CategoryApi;
