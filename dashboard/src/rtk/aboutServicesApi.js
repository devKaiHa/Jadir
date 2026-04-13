import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { AboutServicesEndPoint } from "../Api/GlobalData";

export const aboutServicesApi = createApi({
  reducerPath: "aboutServicesApi",
  baseQuery,
  tagTypes: ["AboutServices"],
  endpoints: (builder) => ({
    getAboutServices: builder.query({
      query: () => AboutServicesEndPoint,
      providesTags: ["AboutServices"],
    }),

    updateAboutServices: builder.mutation({
      query: (data) => ({
        url: AboutServicesEndPoint,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AboutServices"],
    }),
  }),
});

export const { useGetAboutServicesQuery, useUpdateAboutServicesMutation } =
  aboutServicesApi;
