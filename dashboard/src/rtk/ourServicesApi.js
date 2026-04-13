import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { OurServicesEndPoint } from "../Api/GlobalData";

export const ourServicesApi = createApi({
  reducerPath: "ourServicesApi",
  baseQuery,
  tagTypes: ["OurService"],
  endpoints: (builder) => ({
    getAllOurServices: builder.query({
      query: (query = "") => `${OurServicesEndPoint}?${query}`,
      providesTags: ["OurService"],
    }),

    getOneOurService: builder.query({
      query: (id) => `${OurServicesEndPoint}/${id}`,
      providesTags: ["OurService"],
    }),

    postOurService: builder.mutation({
      query: (data) => ({
        url: OurServicesEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OurService"],
    }),

    updateOurService: builder.mutation({
      query: ({ id, data }) => ({
        url: `${OurServicesEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["OurService"],
    }),

    deleteOurService: builder.mutation({
      query: (id) => ({
        url: `${OurServicesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OurService"],
    }),
  }),
});

export const {
  useGetAllOurServicesQuery,
  useGetOneOurServiceQuery,
  usePostOurServiceMutation,
  useUpdateOurServiceMutation,
  useDeleteOurServiceMutation,
} = ourServicesApi;
