import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL ,{boardMemberEndPoint} from "@/api/GlobalData"; 


export const TeamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2ODUzZGY5NTY4MjdlY2EwYjE4ZWFkMTciLCJpYXQiOjE3NTA5MjM0NjgsImV4cCI6MTc1ODY5OTQ2OH0.dXu5YFTpvFDeXTeFLJcmLFyONf3H7asAI7ZfJPUtmUU";
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    getAllTeam: builder.query({
      query: () => `${boardMemberEndPoint}?limit=10000`,
      providesTags: ["Team"],
    }),

    getOneEmployee: builder.query({
      query: (id) => `${boardMemberEndPoint}/${id}`,
      providesTags: ["Team"],
    }),

    postEmployee: builder.mutation({
      query: (formData) => ({
        url: boardMemberEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Team"],
    }),

    updateEmployee: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${boardMemberEndPoint}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Team"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `${boardMemberEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetAllTeamQuery,
  useGetOneEmployeeQuery,
  usePostEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = TeamApi;
