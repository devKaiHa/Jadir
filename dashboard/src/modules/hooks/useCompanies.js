import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteCompanyMutation,
  useGetAllCompaniesQuery,
  useGetOneCompanyQuery,
  usePostCompanyMutation,
  useUpdateCompanyMutation,
} from "../../rtk/companiesApi";

export const useCompanies = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllCompaniesQuery(queryString);

  const [postCompany, postState] = usePostCompanyMutation();
  const [updateCompany, updateState] = useUpdateCompanyMutation();
  const [deleteCompany, deleteState] = useDeleteCompanyMutation();

  return {
    companies: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postCompany,
    isPosting: postState.isLoading,

    updateCompany,
    isUpdating: updateState.isLoading,

    deleteCompany,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneCompany = (id, options = {}) => {
  const query = useGetOneCompanyQuery(id, { skip: !id, ...options });

  return {
    company: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
