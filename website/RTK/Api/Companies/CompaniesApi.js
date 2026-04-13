import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL, { CompaniesEndPoint, CompaniesPublicEndPoint } from "@/api/GlobalData";
import { normalizeCompany } from "@/api/serverData";

export const CompanyApi = createApi({
  reducerPath: "CompanyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: (query) => `${CompaniesPublicEndPoint}${query ? `?${query}` : ""}`,
      transformResponse: (response) => ({
        ...response,
        data: Array.isArray(response?.data)
          ? response.data.map(normalizeCompany)
          : [],
      }),
      providesTags: ["Company"],
    }),

    getOneCompany: builder.query({
      query: (id) => `${CompaniesEndPoint}/${id}`,
      transformResponse: (response) => ({
        ...response,
        data: response?.data ? normalizeCompany(response.data) : null,
      }),
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
      query: ({ id, formData }) => ({
        url: `${CompaniesEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Company"],
    }),

    deleteCompany: builder.mutation({
      query: (deleteId) => ({
        url: `${CompaniesEndPoint}/${deleteId}`,
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
} = CompanyApi;
