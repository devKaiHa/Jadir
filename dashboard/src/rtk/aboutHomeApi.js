import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { AboutHomeEndPoint } from "../Api/GlobalData";

export const aboutHomeApi = createApi({
  reducerPath: "aboutHomeApi",
  baseQuery,
  tagTypes: ["AboutHome"],
  endpoints: (builder) => ({
    getAboutHome: builder.query({
      query: () => AboutHomeEndPoint,
      providesTags: ["AboutHome"],
    }),

    updateAboutHome: builder.mutation({
      query: (data) => ({
        url: AboutHomeEndPoint,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AboutHome"],
    }),
  }),
});

export const { useGetAboutHomeQuery, useUpdateAboutHomeMutation } =
  aboutHomeApi;
