import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { InvestmentFundsEndPoint } from "../Api/GlobalData";

export const investmentFundsApi = createApi({
  reducerPath: "investmentFundsApi",
  baseQuery,
  tagTypes: ["InvestmentFund"],
  endpoints: (builder) => ({
    getAllInvestmentFunds: builder.query({
      query: (query = "") => `${InvestmentFundsEndPoint}?${query}`,
      providesTags: ["InvestmentFund"],
    }),

    getOneInvestmentFund: builder.query({
      query: (id) => `${InvestmentFundsEndPoint}/${id}`,
      providesTags: ["InvestmentFund"],
    }),

    postInvestmentFund: builder.mutation({
      query: (formData) => ({
        url: InvestmentFundsEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["InvestmentFund"],
    }),

    updateInvestmentFund: builder.mutation({
      query: ({ id, data }) => ({
        url: `${InvestmentFundsEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["InvestmentFund"],
    }),

    deleteInvestmentFund: builder.mutation({
      query: (id) => ({
        url: `${InvestmentFundsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["InvestmentFund"],
    }),
  }),
});

export const {
  useGetAllInvestmentFundsQuery,
  useGetOneInvestmentFundQuery,
  usePostInvestmentFundMutation,
  useUpdateInvestmentFundMutation,
  useDeleteInvestmentFundMutation,
} = investmentFundsApi;
