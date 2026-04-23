import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { HomeSliderEndPoint } from "../Api/GlobalData";

export const homeSliderApi = createApi({
  reducerPath: "homeSliderApi",
  baseQuery,
  tagTypes: ["HomeSlider"],
  endpoints: (builder) => ({
    getAllHomeSliders: builder.query({
      query: (query = "") => `${HomeSliderEndPoint}?${query}`,
      providesTags: ["HomeSlider"],
    }),

    getOneHomeSlider: builder.query({
      query: (id) => `${HomeSliderEndPoint}/${id}`,
      providesTags: ["HomeSlider"],
    }),

    postHomeSlider: builder.mutation({
      query: (formData) => ({
        url: HomeSliderEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["HomeSlider"],
    }),

    updateHomeSlider: builder.mutation({
      query: ({ id, data }) => ({
        url: `${HomeSliderEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["HomeSlider"],
    }),

    updateHomeSliderBulk: builder.mutation({
      query: (data) => ({
        url: `${HomeSliderEndPoint}/bulk/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["HomeSlider"],
    }),

    deleteHomeSlider: builder.mutation({
      query: (id) => ({
        url: `${HomeSliderEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HomeSlider"],
    }),
  }),
});

export const {
  useGetAllHomeSlidersQuery,
  useGetOneHomeSliderQuery,
  usePostHomeSliderMutation,
  useUpdateHomeSliderMutation,
  useUpdateHomeSliderBulkMutation,
  useDeleteHomeSliderMutation,
} = homeSliderApi;
