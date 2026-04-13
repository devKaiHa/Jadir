import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { CompaniesEndPoint } from "../Api/GlobalData";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery,
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: (query = "") => `${CompaniesEndPoint}?${query}`,
      providesTags: ["Company"],
    }),

    getOneCompany: builder.query({
      query: (id) => `${CompaniesEndPoint}/${id}`,
      providesTags: ["Company"],
    }),

    postCompany: builder.mutation({
      query: (formData) => ({
        url: CompaniesEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Company"],
    }),

    updateCompany: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CompaniesEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),

    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `${CompaniesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetOneCompanyQuery,
  usePostCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi;
