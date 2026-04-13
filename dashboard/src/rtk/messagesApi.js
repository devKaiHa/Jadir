import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { MessagesEndPoint } from "../Api/GlobalData";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery,
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: (query = "") => `${MessagesEndPoint}?${query}`,
      providesTags: ["Message"],
    }),

    getOneMessage: builder.query({
      query: (id) => `${MessagesEndPoint}/${id}`,
      providesTags: ["Message"],
    }),

    postMessageReply: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MessagesEndPoint}/${id}/reply`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `${MessagesEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useGetOneMessageQuery,
  usePostMessageReplyMutation,
  useDeleteMessageMutation,
} = messagesApi;
