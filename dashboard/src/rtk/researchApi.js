import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { ResearchEndPoint } from "../Api/GlobalData";

export const researchApi = createApi({
  reducerPath: "researchApi",
  baseQuery,
  tagTypes: ["Research"],
  endpoints: (builder) => ({
    getAllResearch: builder.query({
      query: (query = "") => `${ResearchEndPoint}?${query}`,
      providesTags: ["Research"],
    }),

    getOneResearch: builder.query({
      query: (id) => `${ResearchEndPoint}/${id}`,
      providesTags: ["Research"],
    }),

    getResearchBySlug: builder.query({
      query: (slug) => `${ResearchEndPoint}/slug/${slug}`,
      providesTags: ["Research"],
    }),

    postResearch: builder.mutation({
      query: (data) => ({
        url: ResearchEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Research"],
    }),

    updateResearch: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ResearchEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Research"],
    }),

    deleteResearch: builder.mutation({
      query: (id) => ({
        url: `${ResearchEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Research"],
    }),
  }),
});

export const {
  useGetAllResearchQuery,
  useGetOneResearchQuery,
  useGetResearchBySlugQuery,
  usePostResearchMutation,
  useUpdateResearchMutation,
  useDeleteResearchMutation,
} = researchApi;
