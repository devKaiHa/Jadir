import baseURL, { ContactUsEndPoint, MessagesEndPoint } from "@/api/GlobalData";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ContactApi = createApi({
  reducerPath: "ContactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getContactInfo: builder.query({
      query: () => `${ContactUsEndPoint}/public`,
      providesTags: ["Contact"],
    }),
    sendMessage: builder.mutation({
      query: (Data) => ({
        url: `${MessagesEndPoint}`,
        method: "POST",
        body: Data,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useGetContactInfoQuery, useSendMessageMutation } = ContactApi;
