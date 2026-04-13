import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { PlansEndPoint } from "../Api/GlobalData";

export const plansApi = createApi({
  reducerPath: "plansApi",
  baseQuery,
  tagTypes: ["Plan"],
  endpoints: (builder) => ({
    getAllPlans: builder.query({
      query: (query = "") => `${PlansEndPoint}?${query}`,
      providesTags: ["Plan"],
    }),

    getOnePlan: builder.query({
      query: (id) => `${PlansEndPoint}/${id}`,
      providesTags: ["Plan"],
    }),

    postPlan: builder.mutation({
      query: (data) => ({
        url: PlansEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Plan"],
    }),

    updatePlan: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PlansEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Plan"],
    }),

    deletePlan: builder.mutation({
      query: (id) => ({
        url: `${PlansEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Plan"],
    }),
  }),
});

export const {
  useGetAllPlansQuery,
  useGetOnePlanQuery,
  usePostPlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApi;
