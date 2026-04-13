import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BaseURL, { LogInEndPoint } from "../../../api/GlobalData";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
    // prepareHeaders: (headers) => {
    //   if (jwt) {
    //     headers.set("Authorization", `Bearer ${jwt}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["AuthApi"],
  endpoints: (builder) => ({
    LogIn: builder.mutation({
      query: (Data) => ({
        url: `${LogInEndPoint}`,
        method: "POST",
        body: Data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLogInMutation } = AuthApi;
