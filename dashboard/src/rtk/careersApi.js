import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { CareersEndPoint } from "../Api/GlobalData";

export const careersApi = createApi({
  reducerPath: "careersApi",
  baseQuery,
  tagTypes: ["Careers"],
  endpoints: (builder) => ({
    getCareers: builder.query({
      query: (query = "") => `${CareersEndPoint}?${query}`,
      providesTags: ["Careers"],
    }),

    getOneCareer: builder.query({
      query: (id) => `${CareersEndPoint}/${id}`,
      providesTags: ["Careers"],
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
  }),
});

export const {
  useGetCareersQuery,
  useGetOneCareerQuery,
  usePostCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
} = careersApi;
