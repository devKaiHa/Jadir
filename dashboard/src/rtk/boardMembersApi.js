import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { BoardMembersEndPoint } from "../Api/GlobalData";

export const boardMembersApi = createApi({
  reducerPath: "boardMembersApi",
  baseQuery,
  tagTypes: ["BoardMember"],
  endpoints: (builder) => ({
    getAllBoardMembers: builder.query({
      query: (query = "") => `${BoardMembersEndPoint}?${query}`,
      providesTags: ["BoardMember"],
    }),

    getOneBoardMember: builder.query({
      query: (id) => `${BoardMembersEndPoint}/${id}`,
      providesTags: ["BoardMember"],
    }),

    postBoardMember: builder.mutation({
      query: (formData) => ({
        url: BoardMembersEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["BoardMember"],
    }),

    updateBoardMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BoardMembersEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BoardMember"],
    }),

    deleteBoardMember: builder.mutation({
      query: (id) => ({
        url: `${BoardMembersEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BoardMember"],
    }),
  }),
});

export const {
  useGetAllBoardMembersQuery,
  useGetOneBoardMemberQuery,
  usePostBoardMemberMutation,
  useUpdateBoardMemberMutation,
  useDeleteBoardMemberMutation,
} = boardMembersApi;
