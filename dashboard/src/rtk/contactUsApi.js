import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { ContactUsEndPoint } from "../Api/GlobalData";

export const contactUsApi = createApi({
  reducerPath: "contactUsApi",
  baseQuery,
  tagTypes: ["ContactUs"],
  endpoints: (builder) => ({
    getContactUs: builder.query({
      query: () => ContactUsEndPoint,
      providesTags: ["ContactUs"],
    }),

    updateContactUs: builder.mutation({
      query: (data) => ({
        url: ContactUsEndPoint,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ContactUs"],
    }),
  }),
});

export const { useGetContactUsQuery, useUpdateContactUsMutation } =
  contactUsApi;
