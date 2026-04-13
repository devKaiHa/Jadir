import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { PartnersEndPoint } from "../Api/GlobalData";

export const partnersApi = createApi({
  reducerPath: "partnersApi",
  baseQuery,
  tagTypes: ["Partner"],
  endpoints: (builder) => ({
    getAllPartners: builder.query({
      query: (query = "") => `${PartnersEndPoint}?${query}`,
      providesTags: ["Partner"],
    }),

    getOnePartner: builder.query({
      query: (id) => `${PartnersEndPoint}/${id}`,
      providesTags: ["Partner"],
    }),

    postPartner: builder.mutation({
      query: (formData) => ({
        url: PartnersEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Partner"],
    }),

    updatePartner: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PartnersEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Partner"],
    }),

    deletePartner: builder.mutation({
      query: (id) => ({
        url: `${PartnersEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Partner"],
    }),
  }),
});

export const {
  useGetAllPartnersQuery,
  useGetOnePartnerQuery,
  usePostPartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnersApi;
