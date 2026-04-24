import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { PageBannersEndPoint } from "../Api/GlobalData";

export const pageBannersApi = createApi({
  reducerPath: "pageBannersApi",
  baseQuery,
  tagTypes: ["PageBanners"],
  endpoints: (builder) => ({
    getPageBanners: builder.query({
      query: () => PageBannersEndPoint,
      providesTags: ["PageBanners"],
    }),
    updatePageBanners: builder.mutation({
      query: (data) => ({
        url: PageBannersEndPoint,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PageBanners"],
    }),
  }),
});

export const { useGetPageBannersQuery, useUpdatePageBannersMutation } =
  pageBannersApi;
