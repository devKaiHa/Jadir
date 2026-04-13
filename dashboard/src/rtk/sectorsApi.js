import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { SectorsEndPoint } from "../Api/GlobalData";

export const sectorsApi = createApi({
  reducerPath: "sectorsApi",
  baseQuery,
  tagTypes: ["Sector"],
  endpoints: (builder) => ({
    getAllSectors: builder.query({
      query: (query = "") => `${SectorsEndPoint}?${query}`,
      providesTags: ["Sector"],
    }),

    getOneSector: builder.query({
      query: (id) => `${SectorsEndPoint}/${id}`,
      providesTags: ["Sector"],
    }),

    postSector: builder.mutation({
      query: (data) => ({
        url: SectorsEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sector"],
    }),

    updateSector: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SectorsEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Sector"],
    }),

    deleteSector: builder.mutation({
      query: (id) => ({
        url: `${SectorsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sector"],
    }),
  }),
});

export const {
  useGetAllSectorsQuery,
  useGetOneSectorQuery,
  usePostSectorMutation,
  useUpdateSectorMutation,
  useDeleteSectorMutation,
} = sectorsApi;
