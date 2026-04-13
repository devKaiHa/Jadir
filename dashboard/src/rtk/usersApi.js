import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { UsersEndPoint } from "../Api/GlobalData";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (query = "") => `${UsersEndPoint}?${query}`,
      providesTags: ["User"],
    }),

    getOneUser: builder.query({
      query: (id) => `${UsersEndPoint}/${id}`,
      providesTags: ["User"],
    }),

    postUser: builder.mutation({
      query: (data) => ({
        url: UsersEndPoint,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${UsersEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${UsersEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetOneUserQuery,
  usePostUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
