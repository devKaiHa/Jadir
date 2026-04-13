import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { StatisticsEndPoint } from "../Api/GlobalData";

export const statisticsApi = createApi({
  reducerPath: "statisticsApi",
  baseQuery,
  tagTypes: ["Statistic"],
  endpoints: (builder) => ({
    getAllStatistics: builder.query({
      query: (query = "") => `${StatisticsEndPoint}?${query}`,
      providesTags: ["Statistic"],
    }),

    getOneStatistic: builder.query({
      query: (id) => `${StatisticsEndPoint}/${id}`,
      providesTags: ["Statistic"],
    }),

    postStatistic: builder.mutation({
      query: (data) => ({
        url: StatisticsEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Statistic"],
    }),

    updateStatistic: builder.mutation({
      query: ({ id, data }) => ({
        url: `${StatisticsEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Statistic"],
    }),

    deleteStatistic: builder.mutation({
      query: (id) => ({
        url: `${StatisticsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Statistic"],
    }),
  }),
});

export const {
  useGetAllStatisticsQuery,
  useGetOneStatisticQuery,
  usePostStatisticMutation,
  useUpdateStatisticMutation,
  useDeleteStatisticMutation,
} = statisticsApi;
