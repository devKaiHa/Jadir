import baseURL, { OurServicesEndPoint } from "@/api/GlobalData";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ServicesApi = createApi({
  reducerPath: "ServicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    getPublicServices: builder.query({
      query: () => `${OurServicesEndPoint}/public`,
      transformResponse: (response) => ({
        ...response,
        data: Array.isArray(response?.data) ? response.data : [],
      }),
      providesTags: ["Services"],
    }),
  }),
});

export const { useGetPublicServicesQuery } = ServicesApi;
