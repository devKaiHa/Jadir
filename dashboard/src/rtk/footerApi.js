import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { FooterEndPoint } from "../Api/GlobalData";

export const footerApi = createApi({
  reducerPath: "footerApi",
  baseQuery,
  tagTypes: ["Footer"],
  endpoints: (builder) => ({
    getFooter: builder.query({
      query: () => FooterEndPoint,
      providesTags: ["Footer"],
    }),

    updateFooter: builder.mutation({
      query: (data) => ({
        url: FooterEndPoint,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Footer"],
    }),
  }),
});

export const { useGetFooterQuery, useUpdateFooterMutation } = footerApi;
