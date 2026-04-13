import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteInvestmentFundMutation,
  useGetAllInvestmentFundsQuery,
  useGetOneInvestmentFundQuery,
  usePostInvestmentFundMutation,
  useUpdateInvestmentFundMutation,
} from "../../rtk/investmentFundsApi";

export const useInvestmentFunds = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllInvestmentFundsQuery(queryString);

  const [postInvestmentFund, postState] = usePostInvestmentFundMutation();
  const [updateInvestmentFund, updateState] = useUpdateInvestmentFundMutation();
  const [deleteInvestmentFund, deleteState] = useDeleteInvestmentFundMutation();

  return {
    investmentFunds: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postInvestmentFund,
    isPosting: postState.isLoading,

    updateInvestmentFund,
    isUpdating: updateState.isLoading,

    deleteInvestmentFund,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneInvestmentFund = (id, options = {}) => {
  const query = useGetOneInvestmentFundQuery(id, { skip: !id, ...options });

  return {
    investmentFund: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
