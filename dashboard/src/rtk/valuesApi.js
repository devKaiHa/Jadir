import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { ValuesEndPoint } from "../Api/GlobalData";

export const valuesApi = createApi({
  reducerPath: "valuesApi",
  baseQuery,
  tagTypes: ["Value"],
  endpoints: (builder) => ({
    getAllValues: builder.query({
      query: (query = "") => `${ValuesEndPoint}?${query}`,
      providesTags: ["Value"],
    }),

    getOneValue: builder.query({
      query: (id) => `${ValuesEndPoint}/${id}`,
      providesTags: ["Value"],
    }),

    postValue: builder.mutation({
      query: (data) => ({
        url: ValuesEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Value"],
    }),

    updateValue: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ValuesEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Value"],
    }),

    deleteValue: builder.mutation({
      query: (id) => ({
        url: `${ValuesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Value"],
    }),
  }),
});

export const {
  useGetAllValuesQuery,
  useGetOneValueQuery,
  usePostValueMutation,
  useUpdateValueMutation,
  useDeleteValueMutation,
} = valuesApi;
