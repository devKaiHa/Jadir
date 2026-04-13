import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { PoliciesEndPoint } from "../Api/GlobalData";

export const policiesApi = createApi({
  reducerPath: "policiesApi",
  baseQuery,
  tagTypes: ["Policy"],
  endpoints: (builder) => ({
    getAllPolicies: builder.query({
      query: (query = "") => `${PoliciesEndPoint}?${query}`,
      providesTags: ["Policy"],
    }),

    getOnePolicy: builder.query({
      query: (id) => `${PoliciesEndPoint}/${id}`,
      providesTags: ["Policy"],
    }),

    postPolicy: builder.mutation({
      query: (data) => ({
        url: PoliciesEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Policy"],
    }),

    updatePolicy: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PoliciesEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Policy"],
    }),

    deletePolicy: builder.mutation({
      query: (id) => ({
        url: `${PoliciesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Policy"],
    }),
  }),
});

export const {
  useGetAllPoliciesQuery,
  useGetOnePolicyQuery,
  usePostPolicyMutation,
  useUpdatePolicyMutation,
  useDeletePolicyMutation,
} = policiesApi;
