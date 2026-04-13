import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { LogInEndPoint } from "../Api/GlobalData";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: LogInEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
