import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { CareersEndPoint } from "../Api/GlobalData";

export const careersApi = createApi({
  reducerPath: "careersApi",
  baseQuery,
  tagTypes: ["Careers", "CareerApplications", "CareerTemplates"],
  endpoints: (builder) => ({
    getCareers: builder.query({
      query: (query = "") => `${CareersEndPoint}?${query}`,
      providesTags: ["Careers"],
    }),

    getOneCareer: builder.query({
      query: (id) => `${CareersEndPoint}/${id}`,
      providesTags: ["Careers"],
    }),

    getCareerStatistics: builder.query({
      query: () => `${CareersEndPoint}/statistics`,
      providesTags: ["Careers", "CareerApplications"],
    }),

    getCareerTemplates: builder.query({
      query: () => `${CareersEndPoint}/templates`,
      providesTags: ["CareerTemplates"],
    }),

    createCareerTemplate: builder.mutation({
      query: (data) => ({
        url: `${CareersEndPoint}/templates`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CareerTemplates"],
    }),

    postCareer: builder.mutation({
      query: (formData) => ({
        url: CareersEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Careers"],
    }),

    updateCareer: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CareersEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Careers"],
    }),

    deleteCareer: builder.mutation({
      query: (id) => ({
        url: `${CareersEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Careers"],
    }),

    getCareerApplications: builder.query({
      query: (query = "") => `${CareersEndPoint}/applications?${query}`,
      providesTags: ["CareerApplications"],
    }),

    updateCareerApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${CareersEndPoint}/applications/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["CareerApplications"],
    }),
  }),
});

export const {
  useGetCareersQuery,
  useGetOneCareerQuery,
  useGetCareerStatisticsQuery,
  useGetCareerTemplatesQuery,
  useCreateCareerTemplateMutation,
  usePostCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
  useGetCareerApplicationsQuery,
  useUpdateCareerApplicationStatusMutation,
} = careersApi;
